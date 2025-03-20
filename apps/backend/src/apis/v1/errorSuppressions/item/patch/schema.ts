import * as yup from 'yup';

export const schema = yup.object().shape({
  body: yup.object().shape({
      functionName: yup.string().required(),
      reason: yup.string(),
      matchers: yup.array().of(yup.string()),
    }).required(),
}).noUnknown(true);
