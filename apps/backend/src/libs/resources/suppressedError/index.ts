import {
  QueryCommand, UpdateItemCommand, PutItemCommand, ScanCommand, GetItemCommand, DeleteItemCommand
} from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

import { ErrorSuppressionDTO } from '@sauron/types';
import { dynamoDb } from '../../services/aws/dynamoDb';
import { ErrorSuppressionModel } from './model';
import { ENV, SERVICE_NAME } from '../../../../env';

const TABLE_NAME = `${ENV}_${SERVICE_NAME}`;

const parseDynamoItem = (item: any): ErrorSuppressionDTO => {
  const jsonItem = unmarshall(item) as unknown as ErrorSuppressionModel;
  const functionName = jsonItem.pk.split('#')[1];

  delete (jsonItem as any).pk;
  delete (jsonItem as any).sk;

  return {
    ...jsonItem,
    functionName,
    matchers: Array.from(jsonItem.matchers || []),
  } as unknown as ErrorSuppressionDTO;
}

const parseDynamoItems = (items: unknown[]): ErrorSuppressionDTO[] => {
  return items.map(parseDynamoItem);
}

const PK_PREFIX = 'LAMBDA#';
const SK_VALUE = 'CONFIG#ERROR_SUPPRESSION';

export const getErrorSuppressionByFunctionName = async (
  functionName: string,
) => {
  const input = new GetItemCommand({
    TableName: TABLE_NAME,
    Key: {
      pk: { S: `${PK_PREFIX}${functionName}` },
      sk: { S: SK_VALUE },
    },
  });

  const result = await dynamoDb.send(input);

  if (!result?.Item) {
    return undefined;
  }

  return parseDynamoItem(result.Item);
};

export const updateErrorSupression = async ({
  functionName,
  matchers,
  reason,
} : {
  functionName: string,
  matchers: string[],
  reason?: string,
}) => {
  const UpdateExpressions = [
    ...(reason ? ['reason = :r'] : []),
    ...(matchers ? ['matchers = :m'] : []),
  ].join(', ');

  const input = new UpdateItemCommand({
    TableName: TABLE_NAME,
    Key: {
      pk: { S: `${PK_PREFIX}${functionName}` },
      sk: { S: SK_VALUE },
    },
    // Update matchers or reason or reason and matchers is both provided
    UpdateExpression: `SET ${UpdateExpressions}`,
    ExpressionAttributeValues: {
      ...(matchers? { ':m': { SS: matchers } } : {}),
      ...(reason? { ':r': { S: reason } } : {}),
    },
  });

  await dynamoDb.send(input);

  return getErrorSuppressionByFunctionName(functionName);
}

export const createErrorSuppression = async ({
  functionName,
  matchers,
  reason,
}: {
  functionName: string,
  matchers: string[],
  reason?: string,
}) => {
  const pk = `${PK_PREFIX}${functionName}`;
  const sk = SK_VALUE;

  const input = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: {
      pk: { S: pk },
      sk: { S: sk },
      createdAt: { S: new Date().toISOString() },
      functionName: { S: functionName },
      matchers: { SS: matchers },
      ...(reason && { reason: { S: reason } }),
    },
  });

  await dynamoDb.send(input);

  const errorSuppresion = await getErrorSuppressionByFunctionName(functionName);

  return errorSuppresion;
}

export const getAllErrorSuppressions = async () => {
  const input = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: 'GSI-sk-pk',
    KeyConditionExpression: 'sk = :sk',
    ExpressionAttributeValues: {
      ':sk': { S: SK_VALUE },
    },
  });

  const result = await dynamoDb.send(input);

  if (!result?.Items || !result?.Items.length) {
    return [];
  }

  return parseDynamoItems(result.Items);
}

export const deleteErrorSuppressionByFunctionName = async (functionName: string) => {
  const input = new DeleteItemCommand({
    TableName: TABLE_NAME,
    Key: {
      pk: { S: `${PK_PREFIX}${functionName}` },
      sk: { S: SK_VALUE },
    },
  });

  await dynamoDb.send(input);
}
