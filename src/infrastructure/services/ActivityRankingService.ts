import { Activity } from '../../domain/entities/Activity';
import { IActivityRankingService } from '../../domain/interfaces/IActivityRankingService';
import { rankActivities } from '../../domain/logic/activityRanking';
import { getCondition } from '../../domain/logic/weatherConditions';

export class ActivityRankingService implements IActivityRankingService {
  async getActivityRanking(temperature: number, weatherCode: number): Promise<Activity[]> {
    const condition = getCondition(weatherCode);
    return rankActivities(temperature, condition);
  }
}
