import { getAllErrorSuppressions } from '../../../../libs/resources/suppressedError';
import { corsResponse } from '../../../../libs/helpers/api/responses';
import { middyfy } from '../../../../libs/lambda';

const handler = async () => {
  return corsResponse(200, {
    data: await getAllErrorSuppressions()
  });
};

export const main = middyfy(handler);
