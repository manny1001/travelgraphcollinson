import { Activity } from './Activity';

export interface WeatherForecast {
  temperature: number;
  condition: string;
  rankedActivities: Activity[];
}