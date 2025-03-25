import { generateCustomerManagedPolicyArn, scopeResourceNameToService } from '../utils';

const NAME = scopeResourceNameToService('callLambda');

/**
 * Creates a SNS Publish Policy scoped to a specific topic.
 */
export default {
  name: NAME,
  arn: generateCustomerManagedPolicyArn(NAME),
  resource: {
    [NAME]: {
      Type: 'AWS::IAM::ManagedPolicy',
      Properties: {
        ManagedPolicyName: NAME,
        Description: 'Allows calling a function given a name',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'ServerlessGenerated0',
              Effect: 'Allow',
              Action: [
                'lambda:InvokeAsync',
                'lambda:InvokeFunction',
              ],
              Resource: '*',
            },
          ],
        },
      },
    },
  },
};
