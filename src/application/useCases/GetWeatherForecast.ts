import { IWeatherService } from '../../domain/interfaces/IWeatherService';
import { RawWeatherForecast } from '../../domain/entities/RawWeatherForecast';
import { WeatherForecast } from '../../domain/entities/WeatherForecast';
import { getCondition } from '../../domain/logic/weatherConditions';
import { rankActivities } from '../../domain/logic/activityRanking';

export class GetWeatherForecast {
  constructor(private weatherService: IWeatherService) {}

  async execute(latitude: number, longitude: number): Promise<WeatherForecast> {
    const rawForecast : RawWeatherForecast = await this.weatherService.getWeatherForecast(latitude, longitude);
    const condition = getCondition(rawForecast.weatherCode);
    const rankedActivities = rankActivities(rawForecast.temperature, condition);
    return {
      temperature: rawForecast.temperature,
      condition,
      rankedActivities
    };
  }
}