import { ACCOUNT_ID, API_GATEWAY_ALLOWED_IPS, ENV } from '../../../env';

export const resourcePolicy = [
  ...(API_GATEWAY_ALLOWED_IPS.length > 0
    ? [{
    Effect: 'Allow',
    Principal: '*',
    Action: 'execute-api:Invoke',
    Resource: '*',
  },
  {
    Effect: 'Deny',
    Principal: '*',
    Action: 'execute-api:Invoke',
    Resource: `arn:aws:execute-api:*:${ACCOUNT_ID}:${ENV}/*/*/*/*`,
    Condition: {
      NotIpAddress: {
        'aws:SourceIp': API_GATEWAY_ALLOWED_IPS,
      },
    },
  }] : []),
];
