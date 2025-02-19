import { WebClient } from '@slack/web-api';

import { LogFormat } from '@libs/helpers/logs/types';
import { ENV, ERROR_CHANNEL_NAME, SLACK_CLIENT_TOKEN } from '@service/env';
import { generateMessageBlocks } from './messageBlocks';

const slackClient = new WebClient(SLACK_CLIENT_TOKEN);
const ERRORS_CHANNEL = `${ERROR_CHANNEL_NAME}-${ENV}-errors`;
const WARNINGS_CHANNEL = `${ERROR_CHANNEL_NAME}-${ENV}-warnings`;

export const postToErrorsChannel = async (log: LogFormat) => slackClient
  .chat.postMessage({
    channel: ERRORS_CHANNEL,
    blocks: generateMessageBlocks(log),
    text: log.functionName,
  });

export const postToWarningChannel = async (log: LogFormat) => slackClient
  .chat.postMessage({
    channel: WARNINGS_CHANNEL,
    blocks: generateMessageBlocks(log),
    text: log.functionName,
  });
