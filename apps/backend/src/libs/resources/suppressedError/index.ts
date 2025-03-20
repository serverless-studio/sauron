import {
  QueryCommand, UpdateItemCommand, PutItemCommand, ScanCommand, GetItemCommand,
} from '@aws-sdk/client-dynamodb';
import { v4 as uuid } from 'uuid';
import { unmarshall } from '@aws-sdk/util-dynamodb';

import { ErrorSuppressionDTO } from '@sauron/types';
import { dynamoDb } from '../../services/aws/dynamoDb';
import { ErrorSuppressionModel } from './model';
import { ENV, SERVICE_NAME } from '../../../../env';
import { deleteItemsByPKAndPartialSK, queryItemsByPKAndPartialSK } from '../../services/aws/dynamoUtils';

const TABLE_NAME = `${ENV}_${SERVICE_NAME}`;

const parseDynamoItem = (item) => {
  const jsonItem = unmarshall(item) as unknown as ErrorSuppressionModel;
  const id = jsonItem.pk.split('#')[1];
  const functionName = jsonItem.sk.split('#')[1];

  delete jsonItem.pk;
  delete jsonItem.sk;

  return {
    ...jsonItem,
    functionName,
    id,
    matchers: Array.from(jsonItem.matchers),
  } as unknown as ErrorSuppressionDTO;
}

const parseDynamoItems = (items: unknown[]) => {
  return items.map(parseDynamoItem);
}

const PK_PREFIX = 'ERROR_SUPPRESSION#';
const SK_PREFIX = 'FUNCTION_NAME#';

export const getErrorSuppressionById = async (errorSuppressionId: string) => {
  const Items = await queryItemsByPKAndPartialSK(
    TABLE_NAME,
    `${PK_PREFIX}${errorSuppressionId}`,
    'FUNCTION_NAME#',
  );

  return parseDynamoItem(Items[0]);
};

export const getErrorSuppressionByFunctionName = async (
  functionName: string,
) => {
  const input = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: 'GSI-sk-pk',
    KeyConditionExpression: 'sk = :sk and begins_with(pk, :pkPrefix)',
    ExpressionAttributeValues: {
      ':sk': { S: `${SK_PREFIX}${functionName}` },
      ':pkPrefix': { S: PK_PREFIX },
    },
  });

  const result = await dynamoDb.send(input);

  if (!result?.Items || !result?.Items.length) {
    return undefined;
  }

  const suppressedErrors = parseDynamoItems(result.Items);

  return suppressedErrors[0];
};

/**
 * Update error suppression matchers based on the errorSupressionId
 */
export const updateErrorSupression = async ({
  errorSuppressionId,
  functionName,
  matchers,
  reason,
} : {
  errorSuppressionId: string,
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
      pk: { S: `${PK_PREFIX}${errorSuppressionId}` },
      sk: { S: `${SK_PREFIX}${functionName}` },
    },
    // Update matchers or reason or reason and matchers is both provided
    UpdateExpression: `SET ${UpdateExpressions}`,
    ExpressionAttributeValues: {
      ...(matchers? { ':m': { SS: matchers } } : {}),
      ...(reason? { ':r': { S: reason } } : {}),
    },
  });

  await dynamoDb.send(input);

  return getErrorSuppression({
    pk: `${PK_PREFIX}${errorSuppressionId}`,
    sk: `${SK_PREFIX}${functionName}`,
  });
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
  // Adds a uuid error suppression id and a function name
  const pk = `${PK_PREFIX}${uuid()}`;
  const sk = `${SK_PREFIX}${functionName}`;

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

  const errorSuppresion = await getErrorSuppression({
    pk,
    sk,
  });

  return errorSuppresion;
}

export const getErrorSuppression = async ({
  pk,
  sk,
} : { pk: string, sk: string}) => {
  const input = new GetItemCommand({
    TableName: TABLE_NAME,
    Key: {
      pk: { S: pk },
      sk: { S: sk },
    },
  })

  const result = await dynamoDb.send(input);

  return parseDynamoItem(result.Item);
};

export const getAllErrorSuppressions = async () => {
  const input = new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: 'begins_with(pk, :pkPrefix)',
    ExpressionAttributeValues: {
      ':pkPrefix': { S: PK_PREFIX },
    },
  });

  const result = await dynamoDb.send(input);

  return parseDynamoItems(result.Items);
}

export const deleteErrorSuppressionById = async (errorSuppressionId: string) => {
  await deleteItemsByPKAndPartialSK(
    TABLE_NAME,
    `${PK_PREFIX}${errorSuppressionId}`,
    SK_PREFIX,
  );
}
