import {
  assumeRole,
  basicLambdaExecute,
  secretsManagerRead,
} from '../../policies';
import { scopeResourceNameToService } from '../../utils';

export default (extensionName, extraPolicies) => {
  const NAME = scopeResourceNameToService(`dbAccess-${extensionName}`);

  return {
    name: NAME,
    resource: {
      [NAME]: {
        Type: 'AWS::IAM::Role',
        DependsOn: [
          assumeRole.name,
          basicLambdaExecute.name,
          secretsManagerRead.name,
          ...extraPolicies.map(({ name }) => name),
        ],
        Properties: {
          RoleName: NAME,
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Sid: 'ServerlessGenerated',
                Effect: 'Allow',
                Action: [
                  'sts:AssumeRole',
                ],
                Principal: {
                  Service: [
                    'lambda.amazonaws.com',
                    'edgelambda.amazonaws.com',
                  ],
                },
              },
            ],
          },
          ManagedPolicyArns: [
            {
              Ref: assumeRole.name,
            },
            {
              Ref: basicLambdaExecute.name,
            },
            {
              Ref: secretsManagerRead.name,
            },
            ...extraPolicies.map(({ name }) => ({
              Ref: name,
            })),
          ],
        },
      },
    },
  };
};
