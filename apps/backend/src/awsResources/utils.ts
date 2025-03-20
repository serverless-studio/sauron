import camelcase from 'camelcase';

import { ACCOUNT_ID, ENV, SERVICE_NAME } from '../../env';

/**
 * @param name The name of the resource
 * @param camelCase Defaults to true
 * @returns {string}
 */
export const scopeResourceNameToService = (name: string, camelCase = true) => {
  const serviceName = `${SERVICE_NAME}-${ENV}-${name}`;

  return camelCase ? camelcase(serviceName) : serviceName;
};

export const scopeResourceNameToExternalService = (
  microservice: string,
  name: string,
  camelCase = true,
) => {
  const serviceName = `${microservice}-${ENV}-${name}`;

  return camelCase ? camelcase(serviceName) : serviceName;
};

export const generateCustomerManagedPolicyArn = (policyName) => (
  `arn:aws:iam::${ACCOUNT_ID}:policy/${policyName}`
);
