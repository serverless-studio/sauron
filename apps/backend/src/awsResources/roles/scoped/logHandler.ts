import secretAccessingLambda from '../utils/secretAccessingLambda';
import callLambda from '../../policies/callLambda';
import dynamoDbQuery from '../../policies/dynamoDbQuery';

export default secretAccessingLambda('logHandler', [callLambda, dynamoDbQuery]);
