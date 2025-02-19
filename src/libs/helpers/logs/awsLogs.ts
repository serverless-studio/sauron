import zlib from 'zlib';

import { REGION, ENV } from '@service/env';
import { LogFormat } from './types';

const getServiceNameFromFunctionName = (funcitonName, env) => {
  const serviceName = funcitonName.split(`-${env}-`)[0];

  return serviceName;
};

export const awsLogEventToLog = (event) => {
  const payload = Buffer.from(event.awslogs.data, 'base64');

  const logEventData = JSON.parse(zlib.unzipSync(payload).toString());

  const { logEvents, logGroup, logStream, eventFilter } = logEventData;

  const functionName = logGroup.replace('/aws/lambda/', '');
  const link = `https://${REGION}.console.aws.amazon.com/cloudwatch/home?#logsV2:log-groups/log-group/${
    encodeURIComponent(logGroup)
  }/log-events/${
    encodeURIComponent(logStream)
  }`;
  const serviceName = getServiceNameFromFunctionName(functionName, ENV);
  const timestamp = logEvents[0]?.timestamp;

  const log: LogFormat = {
    functionName,
    serviceName,
    link,
    logStream,
    timestamp,
    logEvents,
    eventFilter,
  };

  console.log(log);

  return log;
};
