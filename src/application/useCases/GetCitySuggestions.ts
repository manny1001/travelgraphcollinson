import { ISuggestionService } from '../../domain/interfaces/ISuggestionService';
import { City } from '../../domain/entities/City';

export class GetCitySuggestions {
  constructor(private suggestionsService: ISuggestionService) {}

  async execute(partialName: string): Promise<City[]> {
    return await this.suggestionsService.getCitySuggestions(partialName);
  }
}