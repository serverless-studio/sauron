import { deleteErrorSuppressionById } from '../../../../../libs/resources/suppressedError';
import { corsResponse } from '../../../../../libs/helpers/api/responses';
import { middyfy } from '../../../../../libs/lambda';

const handler = async (event) => {
  const {
    pathParameters: {
      errorSuppressionId,
    },
  } = event;

  await deleteErrorSuppressionById(errorSuppressionId);

  return corsResponse(201);
};

export const main = middyfy(handler);
