import axios from 'axios';
import { ISuggestionService } from '../../domain/interfaces/ISuggestionService';
import { City } from '../../domain/entities/City';

export class SuggestionsService implements ISuggestionService {
  async getCitySuggestions(partialName: string): Promise<City[]> {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(partialName)}`;
      const response = await axios.get(url);
      const results = response;
      return results.data.map((result: City) => ({
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude
      }));
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      return [];
    }
  }
}