import type { AWS } from '@serverless/typescript';

import {
  ENV, REGION, SERVICE_NAME,
} from './env';
import policies from './awsResources/policies';
import roles from './awsResources/roles';
import dynamoDbTables from './awsResources/dynamoDb/tables';
import functions from './src/functions';
import { customDomain } from './awsResources/apiGateway/customDomain';
import { scopeResourceNameToService } from './awsResources/utils';
import logListener from './awsResources/roles/scoped/logListener';

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
