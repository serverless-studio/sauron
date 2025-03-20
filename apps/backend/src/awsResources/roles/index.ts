import apiDynamoAccess from './scoped/apiDynamoAccess';
import logHandler from './scoped/logHandler';
import logListener from './scoped/logListener';

export default {
  ...logHandler.resource,
  ...logListener.resource,
  ...apiDynamoAccess.resource,
};
