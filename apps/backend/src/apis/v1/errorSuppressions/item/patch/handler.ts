import { ErrorSuppressionDTO } from '@sauron/types';
import { updateErrorSupression } from '../../../../../libs/resources/suppressedError';
import { corsResponse } from '../../../../../libs/helpers/api/responses';
import { middyfy } from '../../../../../libs/lambda';
import { schema } from './schema';

const handler = async (event) => {
  const {
    pathParameters: {
      functionName: pathFunctionName,
    },
  } = event;

  const {
    matchers,
    reason,
  } = event.body as Pick<ErrorSuppressionDTO, 'functionName' | 'matchers' | 'reason'>;

  const errorSuppression = await updateErrorSupression({
    functionName: pathFunctionName,
    matchers,
    reason,
  });

  return corsResponse(200, {
    data: errorSuppression,
  });
};

export const main = middyfy(handler, schema);
