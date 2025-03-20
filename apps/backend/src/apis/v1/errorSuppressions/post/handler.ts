import { ErrorSuppressionDTO } from '@sauron/types';
import { createErrorSuppression } from '../../../../libs/resources/suppressedError';
import { corsResponse } from '../../../../libs/helpers/api/responses';
import { middyfy } from '../../../../libs/lambda';

const handler = async (event) => {
  const {
    functionName,
    matchers,
    reason,
  } = event.body as Pick<ErrorSuppressionDTO, 'functionName' | 'matchers' | 'reason'>;

  const errorSuppression = await createErrorSuppression({
    functionName,
    matchers,
    reason,
  })

  return corsResponse(200, {
    data: errorSuppression,
  });
};

export const main = middyfy(handler);
