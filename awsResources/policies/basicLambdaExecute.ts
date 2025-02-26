import {
  ACCOUNT_ID, REGION,
} from '../../env';
import { generateCustomerManagedPolicyArn, scopeResourceNameToService } from '../utils';

const NAME = scopeResourceNameToService('basicLambdaExecute');

export default {
  name: NAME,
  arn: generateCustomerManagedPolicyArn(NAME),
  resource: {
    [NAME]: {
      Type: 'AWS::IAM::ManagedPolicy',
      Properties: {
        ManagedPolicyName: NAME,
        Description: 'Gives logging capabilities',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'ServerlessGenerated0',
              Action: [
                'logs:CreateLogStream',
                'logs:CreateLogGroup',
              ],
              Resource: [
                `arn:aws:logs:${REGION}:${ACCOUNT_ID}:log-group:/aws/lambda/*:*`,
              ],
              Effect: 'Allow',
            },
            {
              Sid: 'ServerlessGenerated1',
              Action: [
                'logs:PutLogEvents',
              ],
              Resource: [
                `arn:aws:logs:${REGION}:${ACCOUNT_ID}:log-group:/aws/lambda/*:*:*`,
              ],
              Effect: 'Allow',
            },
          ],
        },
      },
    },
  },
};
