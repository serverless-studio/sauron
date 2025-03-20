import { generateCustomerManagedPolicyArn, scopeResourceNameToService } from '../utils';

const NAME = scopeResourceNameToService('accessCognitoUserAttributes');

export default {
  name: NAME,
  arn: generateCustomerManagedPolicyArn(NAME),
  resource: {
    [NAME]: {
      Type: 'AWS::IAM::ManagedPolicy',
      Properties: {
        ManagedPolicyName: NAME,
        Description: 'Allows fetching of user attributes',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'ServerlessGenerated',
              Effect: 'Allow',
              Action: 'cognito-idp:AdminGetUser',
              Resource: '*',
            },
          ],
        },
      },
    },
  },
};
