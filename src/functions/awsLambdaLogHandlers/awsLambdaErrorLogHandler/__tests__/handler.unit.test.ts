import * as slack from '@libs/services/slack';
import { main } from '../handler';
import * as suppressedError from '@libs/resources/suppressedError';
import { LogFormat } from '@libs/helpers/logs/types';
import { RequestEvent } from '@middy/http-json-body-parser';
import { Context } from 'aws-lambda';


describe('handler', () => {
  beforeAll(() => {
    jest.spyOn(suppressedError, 'getErrorSuppressionByFunctionName').mockResolvedValue(undefined);
    jest.spyOn(slack, 'postToErrorsChannel').mockResolvedValue(undefined);
  });
  it('should not error', async () => {
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

    const result = await main(event as unknown as RequestEvent, context as Context);

    console.log(result);

    // Assert
    expect(true).toBe(true);
  });
});