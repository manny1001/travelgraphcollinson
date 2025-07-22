import { Activity } from '../entities/Activity';
import { RankingRule, ActivityRules } from '../interfaces/IActivityRankingLogic';

import { activityRules } from '../../utils/activityRules';

export function rankActivities(temperature: number, condition: string): Activity[] {
  // Initialize activities with zero ranking
  const activities: Activity[] = Object.keys(activityRules).map(name => ({
    name,
    ranking: 0,
  }));

  // Apply ranking rules
  activities.forEach(activity => {
    const rules = activityRules[activity.name] || [];
    rules.forEach(rule => {
      if (rule.condition === condition) {
        // Check if temperature is within range (or no range specified)
        if (
          !rule.temperatureRange ||
          (temperature >= rule.temperatureRange[0] && temperature <= rule.temperatureRange[1])
        ) {
          activity.ranking += rule.points;
        }
      }
    });
  });

  // Sort activities by ranking in descending order and assign final ranks
  activities.sort((a, b) => b.ranking - a.ranking);
  return activities.map((a, index) => ({ name: a.name, ranking: index + 1 }));
}