import { defaultCors } from '../../../..//libs/helpers/api/cors';
import apiDynamoAccess from '../../../../awsResources/roles/scoped/apiDynamoAccess';
import { handlerPath } from '../../../../libs/handlerResolver';
import { AWSFunction } from '../../../../libs/types/aws';
import { getLambdaRole } from '../../../../awsResources/utils';

export const postErrorSuppressions: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: getLambdaRole(apiDynamoAccess.name),
  events: [
    {
      http: {
        method: 'POST',
        path: 'v1/error-suppressions',
        cors: defaultCors,
      },
    },
  ],
};
