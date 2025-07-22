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

describe('weatherForecast Query', () => {
  beforeAll(async () => {
    await server.listen(0);
  });

  afterAll(async () => {
    await server.stop();
  });

  test('should return weather forecast with ranked activities for valid coordinates', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        current_weather: { temperature: -5, weathercode: 71 },
      },
    });

    const response = await request(server['httpServer'])
      .post('/graphql')
      .send({
        query: `
          query {
            weatherForecast(latitude: 52.52, longitude: 13.405) {
              temperature
              condition
              rankedActivities {
                name
                ranking
              }
            }
          }
        `,
      });

    expect(response.body.data.weatherForecast).toMatchObject({
      temperature: -5,
      condition: 'snow',
      rankedActivities: expect.arrayContaining([
        { name: 'Skiing', ranking: 1 },
      ]),
    });
  });

  test('should handle invalid coordinates', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    const response = await request(server['httpServer'])
      .post('/graphql')
      .send({
        query: `
          query {
            weatherForecast(latitude: 999, longitude: 999) {
              temperature
            }
          }
        `,
      });

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toContain('Unable to fetch weather forecast');
  });
});