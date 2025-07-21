import { ApolloServer } from 'apollo-server';
import request from 'supertest';
import axios from 'axios';
import typeDefs from '../../presentation/graphql/schema';
import resolvers from '../../presentation/graphql/resolvers';
import { SuggestionsService } from '../../infrastructure/services/SuggestionsService';
import { WeatherService } from '../../infrastructure/services/WeatherService';
import { GetCitySuggestions } from '../../application/useCases/GetCitySuggestions';
import { GetWeatherForecast } from '../../application/useCases/GetWeatherForecast';

jest.mock('axios');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    getCitySuggestions: new GetCitySuggestions(new SuggestionsService()),
    getWeatherForecast: new GetWeatherForecast(new WeatherService()),
  },
});

describe('citySuggestions Query', () => {
  beforeAll(async () => {
    await server.listen(0);
  });

  afterAll(async () => {
    await server.stop();
  });

  test('should return city suggestions for valid partial name', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        results: [{ name: 'Berlin', latitude: 52.52, longitude: 13.405 }],
      },
    });

    const response = await request(server['httpServer'])
      .post('/graphql')
      .send({
        query: `
          query {
            citySuggestions(partialName: "Ber") {
              name
              latitude
              longitude
            }
          }
        `,
      });

    expect(response.body.data.citySuggestions).toEqual([
      { name: 'Berlin', latitude: 52.52, longitude: 13.405 },
    ]);
  });

  test('should return empty array for no matching cities', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { results: [] } });

    const response = await request(server['httpServer'])
      .post('/graphql')
      .send({
        query: `
          query {
            citySuggestions(partialName: "Nonexistent") {
              name
            }
          }
        `,
      });

    expect(response.body.data.citySuggestions).toEqual([]);
  });

  test('should handle API failure gracefully', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    const response = await request(server['httpServer'])
      .post('/graphql')
      .send({
        query: `
          query {
            citySuggestions(partialName: "Ber") {
              name
            }
          }
        `,
      });

    expect(response.body.data.citySuggestions).toEqual([]);
  });
});