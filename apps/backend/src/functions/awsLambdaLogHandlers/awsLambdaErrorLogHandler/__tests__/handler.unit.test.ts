import { Context } from 'aws-lambda';

import * as slack from '../../../../libs/services/slack';

jest.mock('../../../../libs/services/slack', () => ({
  __esModule: true,
  postToErrorsChannel: jest.fn(),
}));
import { main } from '../handler';
import * as suppressedError from '../../../../libs/resources/suppressedError';

jest.mock('../../../../libs/resources/suppressedError', () => ({
  __esModule: true,
  getErrorSuppressionByFunctionName: jest.fn(),
}));
import { LogFormat } from '../../../../libs/helpers/logs/types';


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