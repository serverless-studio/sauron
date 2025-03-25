import { defaultCors } from '../../../../..//libs/helpers/api/cors';
import apiDynamoAccess from '../../../../../awsResources/roles/scoped/apiDynamoAccess';
import { handlerPath } from '../../../../../libs/handlerResolver';
import { AWSFunction } from '../../../../../libs/types/aws';

export const patchErrorSuppressionsItem: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: apiDynamoAccess.name,
  events: [
    {
      http: {
        method: 'PATCH',
        path: 'v1/error-suppressions/{errorSuppressionId}',
        cors: defaultCors,
      },
    },
  ],
};
