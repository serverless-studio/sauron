import { LogFormat } from '../../../libs/helpers/logs/types';
import { middyfy } from '../../../libs/lambda';
import { postToWarningChannel } from '../../../libs/services/slack';

const handler = async (log: LogFormat) => {
  await postToWarningChannel(log);
};

export const main = middyfy(handler);
