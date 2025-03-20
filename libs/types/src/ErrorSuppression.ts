export interface ErrorSuppressionDTO {
  id: string;
  createdAt: string;
  functionName: string;
  matchers: string[];
  reason?: string;
}
