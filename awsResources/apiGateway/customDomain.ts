import { ENV, SERVICE_NAME, SAURON_DOMAIN_NAME } from '../../env';

const SUBDOMAIN = (() => {
  if (ENV === 'prod') {
    return 'api';
  }

  return `${ENV}-api`;
})();

const FULL_DOMAIN = `${SUBDOMAIN}.${SAURON_DOMAIN_NAME}`;

export const customDomain = {
  domainName: FULL_DOMAIN,
  stage: ENV,
  basePath: SERVICE_NAME,
  certificateName: FULL_DOMAIN,
  createRoute53Record: true,
  endpointType: 'regional',
  apiType: 'rest',
  autoDomain: false,
};
