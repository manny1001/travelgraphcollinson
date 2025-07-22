import { Activity } from '../entities/Activity';

export interface IActivityRankingService {
  getActivityRanking(temperature: number, weatherCode: number): Promise<Activity[]>;
}
