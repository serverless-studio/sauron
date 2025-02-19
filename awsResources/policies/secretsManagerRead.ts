import { generateCustomerManagedPolicyArn, scopeResourceNameToService } from '../utils';

const NAME = scopeResourceNameToService('secretsManagerRead');

export default {
  name: NAME,
  arn: generateCustomerManagedPolicyArn(NAME),
  resource: {
    [NAME]: {
      Type: 'AWS::IAM::ManagedPolicy',
      Properties: {
        ManagedPolicyName: NAME,
        Description: 'Allows fetching a secret',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'ServerlessGenerated',
              Effect: 'Allow',
              Action: [
                'secretsmanager:DescribeSecret',
                'secretsmanager:GetSecretValue',
              ],
              Resource: [
                '*',
              ],
            },
          ],
        },
      },
    },
  },
};
