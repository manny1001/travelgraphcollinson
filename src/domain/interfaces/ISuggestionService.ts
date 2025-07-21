import { City } from '../entities/City';

export interface ISuggestionService {
  getCitySuggestions(partialName: string): Promise<City[]>;
}