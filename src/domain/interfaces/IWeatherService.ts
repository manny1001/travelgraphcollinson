import { RawWeatherForecast } from '../entities/RawWeatherForecast';

export interface IWeatherService {
  getWeatherForecast(latitude: number, longitude: number): Promise<RawWeatherForecast>;
}