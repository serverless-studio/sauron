import { LogFormat } from '../../helpers/logs/types';

export const generateMessageBlocks = ({
  functionName,
  eventFilter,
  link,
  logEvents,
  logStream,
  serviceName,
  timestamp,
}: LogFormat) => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*<${link}|Log Link>*`,
    },
  },
  {
    type: 'section',
    fields: [
      {
        type: 'mrkdwn',
        text: `*Service:*\n${serviceName}`,
      },
      {
        type: 'mrkdwn',
        text: `*Function:*\n${functionName}`,
      },
      {
        type: 'mrkdwn',
        /**
         * Timestamps can either have 10 or 13 digits. NodeJS Date expects 13 and this
         * ensures it has 13 digits.
         */
        text: `*When:*\n${new Date(parseInt((String(timestamp).padEnd(13, '0'))))}`,
      },
      {
        type: 'mrkdwn',
        text: `*Event Filter:*\n${eventFilter}`,
      },
      {
        type: 'mrkdwn',
        text: `*Log Stream:*\n${logStream}`,
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `\
*Log Events:*
\`\`\`
${JSON.stringify(logEvents, null, 2).slice(0, 2000)}
\`\`\`
`,
    },
  },
];
