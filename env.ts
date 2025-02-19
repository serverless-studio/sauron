import { Region } from './types';

const {
  IS_LOCAL,
  IS_OFFLINE,
  SLACK_CLIENT_TOKEN,
  DOMAIN_NAME,
  AWS_ACCOUNT_ID
} = process.env;

export const SERVICE_NAME = 'sauron';
export const ENV = process.env.ENV || 'dev';
export const REGION = (process.env.REGION || 'eu-west-2') as Region;
export const ACCOUNT_ID = AWS_ACCOUNT_ID;
export const RUN_LOCALLY = IS_OFFLINE || IS_LOCAL;
export const SAURON_DOMAIN_NAME = DOMAIN_NAME;
export const ERROR_CHANNEL_NAME = SERVICE_NAME;

export {
  SLACK_CLIENT_TOKEN,
};
