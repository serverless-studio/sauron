import logHandler from './scoped/logHandler';
import logListener from './scoped/logListener';

export default {
  ...logHandler.resource,
  ...logListener.resource,
};
