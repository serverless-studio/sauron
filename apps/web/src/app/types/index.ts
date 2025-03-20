
export interface Matcher {
  id: string;
  pattern: string;
}

export interface ErrorSuppressionRule {
  id: string;
  service: string;
  functionName: string;
  matchers: Matcher[];
  createdAt: string;
  updatedAt: string;
}
