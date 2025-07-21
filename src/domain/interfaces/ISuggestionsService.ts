import { City } from '../entities/City';

export interface ISuggestionsService {
  getCitySuggestions(partialName: string): Promise<City[]>;
}