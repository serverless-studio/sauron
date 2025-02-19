import type { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/handlerResolver';
import role from '@service/awsResources/roles/scoped/logHandler';
import { scopeResourceNameToService } from '@service/awsResources/utils';
import { SLACK_CLIENT_TOKEN } from '@service/env';

export const NAME = scopeResourceNameToService('errorLogHandler', false);

const errorLogHandler: AWS['functions'][''] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: role.name,
  environment: {
    SLACK_CLIENT_TOKEN,
  },
};

export default errorLogHandler;
