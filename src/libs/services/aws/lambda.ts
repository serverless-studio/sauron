// eslint-disable-next-line import/no-extraneous-dependencies
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { REGION } from '@service/env';

export const lambdaClient = new LambdaClient({ region: REGION });

interface Args {
  FunctionName: string,
  Payload?: object,
  async?: boolean
}

/**
 * The invocation assumes that the payload is a JSON-like object. And therefore string
 * payloads are not allowed.
 */
const invoke = async ({ FunctionName, Payload, async = false }: Args) => lambdaClient
  .send(new InvokeCommand({
    FunctionName,
    InvocationType: async ? 'Event' : undefined,
    Payload: JSON.stringify(Payload)
  }));

export const lambda = {
  invoke: async ({ FunctionName, Payload }: { FunctionName: string, Payload?: object }) => {
    const response = await invoke({ FunctionName, Payload });
    const result = Buffer.from(response.Payload).toString();

    return JSON.parse(result);
  },
  invokeAsync: async (
    { FunctionName, Payload }: { FunctionName: string, Payload?: object },
  ) => invoke({ FunctionName, Payload, async: true }),
};
