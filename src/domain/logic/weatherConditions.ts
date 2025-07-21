export function getCondition(weatherCode: number): string {
    if (weatherCode >= 51 && weatherCode <= 55) return 'drizzle';
    if (weatherCode >= 61 && weatherCode <= 65) return 'rain';
    if (weatherCode >= 71 && weatherCode <= 75) return 'snow';
    return 'clear';
  }