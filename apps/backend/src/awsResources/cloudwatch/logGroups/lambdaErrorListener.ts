import { scopeResourceNameToService } from '../../utils';

export const RESOURCE_NAME = scopeResourceNameToService('Sauron');

export default {
  name: RESOURCE_NAME,
  resource: {
    Type: 'AWS::Logs::LogGroup',
    Properties: {
      LogGroupName: RESOURCE_NAME,
    },
  },
};
