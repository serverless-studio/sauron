export interface ErrorSuppressionDTO {
  createdAt: string;
  functionName: string;
  matchers: string[];
  reason?: string;
}
