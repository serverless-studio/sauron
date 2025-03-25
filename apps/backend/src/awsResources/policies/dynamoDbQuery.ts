import { generateCustomerManagedPolicyArn, scopeResourceNameToService } from '../utils';

const NAME = scopeResourceNameToService('dynamoDbQuery');

export default {
  name: NAME,
  arn: generateCustomerManagedPolicyArn(NAME),
  resource: {
    [NAME]: {
      Type: 'AWS::IAM::ManagedPolicy',
      Properties: {
        ManagedPolicyName: NAME,
        Description: 'Allows calling the RDS Data API',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'ServerlessGenerated',
              Effect: 'Allow',
              Action: [
                'dynamodb:BatchGetItem',
                'dynamodb:BatchWriteItem',
                'dynamodb:DeleteItem',
                'dynamodb:GetItem',
                'dynamodb:GetRecords',
                'dynamodb:PutItem',
                'dynamodb:Query',
                'dynamodb:Scan',
                'dynamodb:UpdateItem',
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
