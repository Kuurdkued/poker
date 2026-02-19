
export interface AnalysisResult {
  id: string;
  email: string;
  username: string;
  domain: string;
  usernameLength: number;
  dotPositions: number;
  totalVariations: number;
  timestamp: number;
}

export interface HistoryItem extends AnalysisResult {}
