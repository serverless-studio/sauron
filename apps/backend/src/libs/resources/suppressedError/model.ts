import { ErrorSuppressionDTO } from '@sauron/types';

export type ErrorSuppressionModel = Omit<ErrorSuppressionDTO, 'functionName'> & {
  pk: string;
  sk: string;
};
