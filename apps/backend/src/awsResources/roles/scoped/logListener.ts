import secretAccessingLambda from '../utils/secretAccessingLambda';
import callLambda from '../../policies/callLambda';

export default secretAccessingLambda('logListener', [callLambda]);
