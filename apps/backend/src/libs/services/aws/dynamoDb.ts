import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import { SAURON_MAIN_REGION } from '../../../../env';

export const dynamoDb = new DynamoDBClient({
  region: SAURON_MAIN_REGION,
});
