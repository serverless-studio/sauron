import { DeleteItemCommand, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { dynamoDb } from '../dynamoDb';

export const getItemByPK = async (tableName: string, pkValue: string) => {
  const params = {
    TableName: tableName,
    Key: {
      pk: { S: pkValue },
    },
  };

  try {
    const command = new GetItemCommand(params);
    const result = await dynamoDb.send(command);

    if (result.Item) {
      console.log('Item found:', result.Item);
      return result.Item; // Return the item
    } else {
      console.log('Item not found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
}

export const queryItemsByPKAndPartialSK = async (
  tableName: string,
  pkValue: string,
  skPrefix: string // The known prefix of the SK
) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'pk = :pk and begins_with(sk, :skPrefix)',
    ExpressionAttributeValues: {
      ':pk': { S: pkValue },
      ':skPrefix': { S: skPrefix },
    },
  };

  try {
    const command = new QueryCommand(params);
    const result = await dynamoDb.send(command);

    if (result.Items && result.Items.length > 0) {
      console.log('Items found:', result.Items);
      return result.Items; // Return the array of items
    } else {
      console.log('No items found.');
      return [];
    }
  } catch (error) {
    console.error('Error querying items:', error);
    return [];
  }
}

export const deleteItemsByPKAndPartialSK  = async (
  tableName: string,
  pkValue: string,
  skPrefix: string
) => {
  try {
    const queryParams = {
      TableName: tableName,
      KeyConditionExpression: 'pk = :pk and begins_with(sk, :skPrefix)',
      ExpressionAttributeValues: {
        ':pk': { S: pkValue },
        ':skPrefix': { S: skPrefix },
      },
    };

    const queryResult = await dynamoDb.send(new QueryCommand(queryParams));

    if (queryResult.Items && queryResult.Items.length > 0) {
      for (const item of queryResult.Items) {
        const deleteParams = {
          TableName: tableName,
          Key: {
            pk: item.pk,
            sk: item.sk,
          },
        };

        await dynamoDb.send(new DeleteItemCommand(deleteParams));
      }
    }
  } catch (error) {
    console.error('Error deleting items:', error);
  }
}