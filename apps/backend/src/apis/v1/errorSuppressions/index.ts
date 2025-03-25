import { getErrorSuppressions } from './get';
import item from './item';
import { postErrorSuppressions } from './post';

export default {
  getErrorSuppressions,
  postErrorSuppressions,
  ...item,
};
