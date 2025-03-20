import { LogFormat } from '@sauron/types';

import { middyfy } from '../../../libs/lambda';
import { getErrorSuppressionByFunctionName } from '../../../libs/resources/suppressedError';
import { postToErrorsChannel } from '../../../libs/services/slack';

const handler = async (log: LogFormat) => {
  const {
    functionName,
    logEvents,
    link,
  } = log;

  const errorSuppression = await getErrorSuppressionByFunctionName(functionName);

  console.log('errorSuppression', errorSuppression);

  if (errorSuppression) {
    const ignore = errorSuppression.matchers.find((matcher) => JSON.stringify(
      logEvents,
    ).includes(matcher));

    if (ignore) {
      console.log(`Ignoring error with link ${link}`);

      return;
    }
  }

  await postToErrorsChannel(log);
};

export const main = middyfy(handler);
