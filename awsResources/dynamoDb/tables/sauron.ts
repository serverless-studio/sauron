import { ENV } from '@service/env';
import { scopeResourceNameToService } from '../../utils';

export const TABLE_NAME = `${ENV}_sauron`;
export const RESOURCE_NAME = scopeResourceNameToService(`${TABLE_NAME}DynamoDbTable`);

export const sauronTable = {
  name: RESOURCE_NAME,
  resource: {
    [RESOURCE_NAME]: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: TABLE_NAME,
        KeySchema: [
          {
            KeyType: 'HASH',
            AttributeName: 'pk',
          },
          {
            KeyType: 'RANGE',
            AttributeName: 'sk',
          },
        ],
        AttributeDefinitions: [
          {
            AttributeName: 'pk',
            AttributeType: 'S',
          },
          {
            AttributeName: 'sk',
            AttributeType: 'S',
          },
        ],
        GlobalSecondaryIndexes: [{
          IndexName: 'GSI-sk-pk',
          KeySchema: [
            {
              KeyType: 'HASH',
              AttributeName: 'sk',
            },
            {
              KeyType: 'RANGE',
              AttributeName: 'pk',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        }],
        BillingMode: 'PAY_PER_REQUEST',
      },
    },
  },
};
