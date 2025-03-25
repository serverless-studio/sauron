import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import { REGION } from '../../../../env';

export const dynamoDb = new DynamoDBClient({
  region: REGION,
});
