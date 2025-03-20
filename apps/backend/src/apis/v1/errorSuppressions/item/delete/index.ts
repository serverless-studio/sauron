import { defaultCors } from '../../../../../libs/helpers/api/cors';
import apiDynamoAccess from '../../../../../awsResources/roles/scoped/apiDynamoAccess';
import { handlerPath } from '../../../../../libs/handlerResolver';
import { AWSFunction } from '../../../../../libs/types/aws';

export const deleteErrorSuppressionsItem: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: apiDynamoAccess.name,
  events: [
    {
      http: {
        method: 'DELETE',
        path: 'v1/error-suppressions/{errorSuppressionId}',
        cors: defaultCors,
      },
    },
  ],
};
