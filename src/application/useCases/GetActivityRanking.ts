import { Activity } from '../../domain/entities/Activity';
import { IActivityRankingService } from '../../domain/interfaces/IActivityRankingService';

export class GetActivityRanking {
  constructor(private activityRankingService: IActivityRankingService) {}
 
  async execute(temperature: number, weatherCode: number): Promise<Activity[]> {
    return this.activityRankingService.getActivityRanking(temperature, weatherCode);
  }
}
