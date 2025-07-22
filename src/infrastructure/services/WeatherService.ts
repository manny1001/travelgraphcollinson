import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { IWeatherService } from '../../domain/interfaces/IWeatherService';
import { RawWeatherForecast } from '../../domain/entities/RawWeatherForecast';

export class WeatherService implements IWeatherService {
  async getWeatherForecast(latitude: number, longitude: number): Promise<RawWeatherForecast> {
    try {
      const baseUrl = process.env.WEATHER_API_URL;
      if (!baseUrl) {
        throw new Error('WEATHER_API_URL is not defined in environment variables');
      }
      const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
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