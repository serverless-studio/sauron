import {
  ENV, ACCOUNT_ID, REGION, SERVICE_NAME,
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
                // eslint-disable-next-line max-len
                `arn:aws:logs:${REGION}:${ACCOUNT_ID}:log-group:/aws/lambda/${SERVICE_NAME}-${ENV}*:*`,
              ],
              Effect: 'Allow',
            },
            {
              Sid: 'ServerlessGenerated1',
              Action: [
                'logs:PutLogEvents',
              ],
              Resource: [
                // eslint-disable-next-line max-len
                `arn:aws:logs:${REGION}:${ACCOUNT_ID}:log-group:/aws/lambda/${SERVICE_NAME}-${ENV}*:*:*`,
              ],
              Effect: 'Allow',
            },
          ],
        },
      },
    },
  },
};
