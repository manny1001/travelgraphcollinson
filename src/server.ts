import { ApolloServer } from 'apollo-server';
import typeDefs from './presentation/graphql/schema';
import resolvers from './presentation/graphql/resolvers';
import { SuggestionsService } from './infrastructure/services/SuggestionsService';
import { WeatherService } from './infrastructure/services/WeatherService';
import { GetCitySuggestions } from './application/useCases/GetCitySuggestions';
import { GetWeatherForecast } from './application/useCases/GetWeatherForecast';

const suggestionsService = new SuggestionsService();
const weatherService = new WeatherService();

const getCitySuggestions = new GetCitySuggestions(suggestionsService);
const getWeatherForecast = new GetWeatherForecast(weatherService);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    getCitySuggestions,
    getWeatherForecast
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});