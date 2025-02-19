import { LogFormat } from '@libs/helpers/logs/types';

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
        text: `*When:*\n${timestamp}`,
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
