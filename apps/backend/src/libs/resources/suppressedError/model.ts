import { ErrorSuppressionDTO } from '@sauron/types';

export type ErrorSuppressionModel = Omit<ErrorSuppressionDTO, 'id' | 'functionName'> & {
  pk: string;
  sk: string;
};