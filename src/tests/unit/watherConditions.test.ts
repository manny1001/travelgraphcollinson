import { getCondition } from '../../domain/logic/weatherConditions';

describe('getCondition', () => {
  test('should return drizzle for weather codes 51-55', () => {
    expect(getCondition(51)).toBe('drizzle');
    expect(getCondition(55)).toBe('drizzle');
  });

  test('should return rain for weather codes 61-65', () => {
    expect(getCondition(61)).toBe('rain');
    expect(getCondition(65)).toBe('rain');
  });

  test('should return snow for weather codes 71-75', () => {
    expect(getCondition(71)).toBe('snow');
    expect(getCondition(75)).toBe('snow');
  });

  test('should return clear for other weather codes', () => {
    expect(getCondition(0)).toBe('clear');
    expect(getCondition(100)).toBe('clear');
  });
});