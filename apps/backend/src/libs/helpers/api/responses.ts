/* eslint-disable @typescript-eslint/no-explicit-any */
export const successResponse = (statusCode: number, response?: any) => ({
  statusCode,
  body: response ? JSON.stringify(response) : '',
});

export const corsResponse = (
  statusCode: number,
  response?: any,
  headers: { [key: string]: string } = {},
) => ({
  statusCode,
  headers: {
    ...headers,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: response ? JSON.stringify(response) : '',
});

interface ErrorFormat {
  message: string;
  path?: string;
}

export const multipleErrorsResponse = (statusCode: number, errors: ErrorFormat[]) => ({
  statusCode,
  body: JSON.stringify({
    errors,
  }),
});

export const errorResponse = (statusCode: number, message: string) => ({
  statusCode,
  body: JSON.stringify({
    errors: [{
      message,
    }],
  }),
});
