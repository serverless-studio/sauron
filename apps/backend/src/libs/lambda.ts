import { Handler } from 'aws-lambda';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { Schema } from 'yup';

export const middyfy = (handler: Handler, schema?: Schema) => middy(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (event: any, context, callback) => {
    if (schema) {
      await schema.validate(event, { abortEarly: false });
    }

    return handler(event, context, callback);
  },
).use(middyJsonBodyParser());
