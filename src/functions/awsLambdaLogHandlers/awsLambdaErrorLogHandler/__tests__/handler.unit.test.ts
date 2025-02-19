import * as slack from '@libs/services/slack';
import { main } from '../handler';
import * as suppressedError from '@libs/resources/suppressedError';
import { LogFormat } from '@libs/helpers/logs/types';
import type { RequestEvent } from '@middy/http-json-body-parser';
import { Context } from 'aws-lambda';


describe('middy', () => {
  beforeAll(() => {
    jest.spyOn(suppressedError, 'getErrorSuppressionByFunctionName').mockResolvedValue(undefined);
    jest.spyOn(slack, 'postToErrorsChannel').mockResolvedValue(undefined);
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
      timestamp: '123',
    };
    const context = {};

    await main(event as unknown as RequestEvent, context as Context, null);


    expect(true).toBe(true);
  });
});