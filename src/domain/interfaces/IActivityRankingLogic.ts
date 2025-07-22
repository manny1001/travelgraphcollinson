export interface RankingRule {
  condition: string;
  temperatureRange?: [number, number]; // [min, max] inclusive; undefined means any temperature
  points: number;
}

export interface ActivityRules {
  [activityName: string]: RankingRule[];
}
