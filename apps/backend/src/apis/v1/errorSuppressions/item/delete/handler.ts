import { deleteErrorSuppressionByFunctionName } from '../../../../../libs/resources/suppressedError';
import { corsResponse } from '../../../../../libs/helpers/api/responses';
import { middyfy } from '../../../../../libs/lambda';

const handler = async (event) => {
  const {
    pathParameters: {
      functionName,
    },
  } = event;

  await deleteErrorSuppressionByFunctionName(functionName);

  return corsResponse(201);
};

export const main = middyfy(handler);
