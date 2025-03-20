import type { AWS } from '@serverless/typescript';

import {
  API_GATEWAY_ALLOWED_IPS,
  ENV, REGION, SERVICE_NAME,
} from './env';
import policies from './src/awsResources/policies';
import roles from './src/awsResources/roles';
import dynamoDbTables from './src/awsResources/dynamoDb/tables';
import functions from './src/functions';
import { customDomain } from './src/awsResources/apiGateway/customDomain';
import { scopeResourceNameToService } from './src/awsResources/utils';
import { resourcePolicy

} from './src/awsResources/apiGateway/resourcePolicy';
import logListener from './src/awsResources/roles/scoped/logListener';
import apis from './src/apis';

const serverlessConfiguration: AWS = {
  service: SERVICE_NAME,
  frameworkVersion: '4',
  plugins: [],
  provider: {
    name: 'aws',
    region: REGION,
    runtime: 'nodejs20.x',
    stage: ENV,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      resourcePolicy,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REGION,
      ENV,
    },
  },
  functions: {
    ...functions,
    ...(API_GATEWAY_ALLOWED_IPS.length > 0 ? apis : {}),
  },
  package: { individually: true },
  custom: {
    customDomain,
    esbuild: {
      bundle: true,
      minify: true,
      exclude: ['@aws-sdk/'],
      target: 'node20',
      concurrency: 10,
      configFile: ''
    },
  },
  resources: {
    Resources: {
      ...policies,
      ...roles,
      ...dynamoDbTables,
    },
    Outputs: {
      lambdaLogListenerRole: {
        Value: { 'Fn::GetAtt': [logListener.name, 'Arn'] },
        Export: {
          Name: scopeResourceNameToService('lambdaLogListenerRoleArn'),
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
