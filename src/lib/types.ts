export type MetricTone = "positive" | "neutral" | "alert";
export type PredictionConfidence = "core" | "sharp" | "watch";
export type AlertStatus = "armed" | "cooldown" | "disabled";

export interface Metric {
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
}

export interface MatchPreview {
  id: string;
  league: string;
  startTime: string;
  homeTeam: string;
  awayTeam: string;
  status: string;
  injuries: number;
  momentum: number;
  modelConfidence: number;
  h2hEdge: string;
}

export interface PredictionCard {
  id: string;
  fixtureId: string;
  market: string;
  probability: number;
  confidence: PredictionConfidence;
  rationale: string;
  liveTrigger: string;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  channel: string;
  status: AlertStatus;
}

export interface AccessTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  accent: string;
}

export interface DashboardSnapshot {
  generatedAt: string;
  competition: string;
  aiSummary: string;
  metrics: Metric[];
  matches: MatchPreview[];
  predictions: PredictionCard[];
  alertRules: AlertRule[];
  tiers: AccessTier[];
}
