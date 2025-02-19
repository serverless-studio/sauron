import accessCognitoUserAttributes from './accessCognitoUserAttributes';
import assumeRole from './assumeRole';
import basicLambdaExecute from './basicLambdaExecute';
import secretsManagerRead from './secretsManagerRead';
import callLambda from './callLambda';
import dynamoDbQuery from './dynamoDbQuery';

export { default as accessCognitoUserAttributes } from './accessCognitoUserAttributes';
export { default as assumeRole } from './assumeRole';
export { default as basicLambdaExecute } from './basicLambdaExecute';
export { default as secretsManagerRead } from './secretsManagerRead';

export default {
  ...accessCognitoUserAttributes.resource,
  ...assumeRole.resource,
  ...basicLambdaExecute.resource,
  ...secretsManagerRead.resource,
  ...callLambda.resource,
  ...dynamoDbQuery.resource,
};
