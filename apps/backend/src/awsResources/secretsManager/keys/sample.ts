import { scopeResourceNameToService } from '../../utils';

export const RESOURCE_NAME = scopeResourceNameToService('Sample');

export default {
  [RESOURCE_NAME]: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Name: RESOURCE_NAME,
      SecretString: '{"sample":"-"}',
    },
  },
};
