import { ActivityRules } from '../domain/interfaces/IActivityRankingLogic';

export const activityRules: ActivityRules = {
  Skiing: [
    { condition: 'snow', temperatureRange: [-Infinity, 15], points: 12 },
    { condition: 'snow', temperatureRange: [15, 25], points: 8 },
  ],
  Surfing: [
    { condition: 'clear', temperatureRange: [30, Infinity], points: 10 },
    { condition: 'clear', temperatureRange: [20, 30], points: 6 },
  ],
  'Outdoor Sightseeing': [
    { condition: 'clear', temperatureRange: [20, 30], points: 10 },
    { condition: 'clear', temperatureRange: [30, Infinity], points: 6 },
    { condition: 'clear', temperatureRange: [-Infinity, 20], points: 4 },
    { condition: 'cloudy', points: 5 },
  ],
  'Indoor Sightseeing': [
    { condition: 'rain', points: 10 },
    { condition: 'cloudy', points: 3 },
    { condition: 'windy', points: 6 },
    { condition: 'foggy', points: 8 },
  ],
  Hiking: [
    { condition: 'clear', temperatureRange: [20, 30], points: 8 },
    { condition: 'clear', temperatureRange: [-Infinity, 20], points: 3 },
    { condition: 'cloudy', points: 6 },
  ],
  'Museum Visit': [
    { condition: 'rain', points: 8 },
    { condition: 'windy', points: 5 },
    { condition: 'foggy', points: 6 },
  ],
};
