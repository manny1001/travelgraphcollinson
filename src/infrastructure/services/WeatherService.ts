import axios from 'axios';
import { IWeatherService } from '../../domain/interfaces/IWeatherService';
import { RawWeatherForecast } from '../../domain/entities/RawWeatherForecast';

export class WeatherService implements IWeatherService {
  async getWeatherForecast(latitude: number, longitude: number): Promise<RawWeatherForecast> {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const response = await axios.get(url);
      const currentWeather = response.data.current_weather;
      return {
        temperature: currentWeather.temperature,
        weatherCode: currentWeather.weathercode
      };
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw new Error('Unable to fetch weather forecast');
    }
  }
}