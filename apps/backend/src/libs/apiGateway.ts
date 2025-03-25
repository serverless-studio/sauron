import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

export type ValidatedAPIGatewayProxyEvent<S> = Omit<
  APIGatewayProxyEvent, 'body'
> & { body: FromSchema<S> }

export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult
>

export const formatJSONResponse = (response: object) => ({
  statusCode: 200,
  body: JSON.stringify(response),
});

export const errorResponse = (statusCode: number, message: string) => ({
  statusCode,
  body: JSON.stringify({
    errors: [{
      message,
    }],
  }),
});

export const resourceNotFoundResponse = (resourceName: string, id: string) => errorResponse(
  404,
  `Could not find '${resourceName}' with the ID '${id}'`,
);

export const noContentResponse = () => ({
  statusCode: 204,
  body: '',
});
