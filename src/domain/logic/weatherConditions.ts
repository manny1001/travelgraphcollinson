// WMO Weather interpretation codes mapping
// See: https://open-meteo.com/en/docs#api_form
export type WeatherCondition =
  | 'clear'
  | 'partly_cloudy'
  | 'fog'
  | 'drizzle'
  | 'freezing_drizzle'
  | 'rain'
  | 'freezing_rain'
  | 'snow'
  | 'snow_grains'
  | 'rain_showers'
  | 'snow_showers'
  | 'thunderstorm'
  | 'thunderstorm_hail'
  | 'unknown';

const weatherCodeToCondition: { [key: number]: WeatherCondition } = {
  0: 'clear',
  1: 'partly_cloudy', 2: 'partly_cloudy', 3: 'partly_cloudy',
  45: 'fog', 48: 'fog',
  51: 'drizzle', 53: 'drizzle', 55: 'drizzle',
  56: 'freezing_drizzle', 57: 'freezing_drizzle',
  61: 'rain', 63: 'rain', 65: 'rain',
  66: 'freezing_rain', 67: 'freezing_rain',
  71: 'snow', 73: 'snow', 75: 'snow',
  77: 'snow_grains',
  80: 'rain_showers', 81: 'rain_showers', 82: 'rain_showers',
  85: 'snow_showers', 86: 'snow_showers',
  95: 'thunderstorm',
  96: 'thunderstorm_hail', 99: 'thunderstorm_hail',
};

export function getCondition(weatherCode: number): WeatherCondition {
  return weatherCodeToCondition[weatherCode] || 'unknown';
}