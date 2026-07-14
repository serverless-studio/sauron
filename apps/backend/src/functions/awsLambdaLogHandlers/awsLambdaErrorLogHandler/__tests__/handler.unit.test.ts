import { Context } from 'aws-lambda';

import * as slack from '../../../../libs/services/slack';
import { main } from '../handler';
import * as suppressedError from '../../../../libs/resources/suppressedError';
import { LogFormat } from '../../../../libs/helpers/logs/types';

jest.mock('../../../../libs/resources/suppressedError', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../libs/resources/suppressedError'),
  getErrorSuppressionByFunctionName: jest.fn(),
}));

jest.mock('../../../../libs/services/slack', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../libs/services/slack'),
  postToErrorsChannel: jest.fn(),
}));

describe('middy', () => {
  beforeAll(() => {
    (suppressedError.getErrorSuppressionByFunctionName as jest.Mock).mockResolvedValue(undefined);
    (slack.postToErrorsChannel as jest.Mock).mockResolvedValue(undefined);
  });
  it('should not throw error', async () => {
    // Arrange
    const event: LogFormat = {
      functionName: 'test',
      logEvents: [{
        message: 'test',
        timestamp: 123,
        id: 'test',
      }],
      link: 'test',
      eventFilter: '?ERROR',
      logStream: 'test',
      serviceName: 'test',
      timestamp: 123,
    };
    const context = {};

    await main(event, context as Context);


    expect(true).toBe(true);
  });
});
