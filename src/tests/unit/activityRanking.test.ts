import { rankActivities } from '../../domain/logic/activityRanking';
import { Activity } from  "../../domain/entities/Activity"

describe('rankActivities', () => {
  test('should rank Skiing highest for snow and sub-zero temperature', () => {
    const result = rankActivities(-5, 'snow');
    expect(result[0]).toEqual({ name: 'Skiing', ranking: 1 });
    expect(result[1].ranking).toBe(2);
  });

  test('should rank Surfing and Outdoor Sightseeing high for clear and warm temperature', () => {
    const result = rankActivities(30, 'clear');
    expect(result[0]).toEqual({ name: 'Surfing', ranking: 1 });
    expect(result[1]).toEqual({ name: 'Outdoor Sightseeing', ranking: 2 });
  });

  test('should rank Indoor Sightseeing highest for rain', () => {
    const result = rankActivities(15, 'rain');
    expect(result[0]).toEqual({ name: 'Indoor Sightseeing', ranking: 1 });
    expect(result[1].ranking).toBe(2);
  });

  test('should handle edge case with neutral conditions', () => {
    const result = rankActivities(15, 'clear');
    expect(result).toHaveLength(4);
    expect(result.every((a: Activity) => a.ranking >= 1 && a.ranking <= 4)).toBe(true);
  });
});