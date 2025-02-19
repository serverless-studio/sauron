import { QueryCommand } from '@aws-sdk/client-dynamodb';

import { dynamoDb } from '@libs/services/aws/dynamoDb';
import { SuppressedErrorModel } from './model';
import { ENV, SERVICE_NAME } from '@service/env';

export const getErrorSuppressionByFunctionName = async (
  functionName: string,
) => {
  const input = new QueryCommand({
    TableName: `${ENV}_${SERVICE_NAME}`,
    IndexName: 'GSI-sk-pk',
    KeyConditionExpression: 'pk = :pk AND sk = :sk',
    ExpressionAttributeValues: {
      ':pk': { S: `FUNCTION_NAME#${functionName}` },
      ':sk': { S: 'LOG_SUPPRESSION#ERROR' },
    },
  });

  const result = await dynamoDb.send(input);

  return result?.Items[0] as unknown as SuppressedErrorModel || undefined;
};
