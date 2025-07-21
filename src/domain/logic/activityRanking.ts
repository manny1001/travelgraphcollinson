import { Activity } from '../entities/Activity';

export function rankActivities(temperature: number, condition: string): Activity[] {
  const activities: Activity[] = [
    { name: 'Skiing', ranking: 0 },
    { name: 'Surfing', ranking: 0 },
    { name: 'Indoor Sightseeing', ranking: 0 },
    { name: 'Outdoor Sightseeing', ranking: 0 }
  ];

  if (condition === 'snow' && temperature < 0) {
    activities.find(a => a.name === 'Skiing')!.ranking += 10;
  }
  if (condition === 'clear' && temperature > 25) {
    activities.find(a => a.name === 'Surfing')!.ranking += 10;
    activities.find(a => a.name === 'Outdoor Sightseeing')!.ranking += 8;
  }
  if (condition === 'rain') {
    activities.find(a => a.name === 'Indoor Sightseeing')!.ranking += 10;
  }

  activities.sort((a, b) => b.ranking - a.ranking);
  return activities.map((a, index) => ({ name: a.name, ranking: index + 1 }));
}