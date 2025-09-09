import type { AWS } from 'osls';

import { handlerPath } from '../../../libs/handlerResolver';
import role from '../../../awsResources/roles/scoped/logHandler';
import { scopeResourceNameToService } from '../../../awsResources/utils';
import { SLACK_CLIENT_TOKEN } from '../../../../env';

export const NAME = scopeResourceNameToService('errorLogHandler', false);

const errorLogHandler: AWS['functions'][''] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: role.name,
  environment: {
    SLACK_CLIENT_TOKEN,
  },
};

export default errorLogHandler;
