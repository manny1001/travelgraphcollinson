import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { ISuggestionService } from '../../domain/interfaces/ISuggestionService';
import { City } from '../../domain/entities/City';

export class SuggestionsService implements ISuggestionService {
  async getCitySuggestions(partialName: string): Promise<City[]> {
    try {
      const baseUrl = process.env.GEOCODING_API_URL;
      if (!baseUrl) {
        throw new Error('GEOCODING_API_URL is not defined in environment variables');
      }
      const url = `${baseUrl}?name=${encodeURIComponent(partialName)}`;
      const response = await axios.get(url);
      const results = response || [];
      return (results.data.results || []).map((result: any) => new City(result));
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      return [];
    }
  }
}