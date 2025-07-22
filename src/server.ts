import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import typeDefs from './presentation/graphql/schema';
import resolvers from './presentation/graphql/resolvers';
import { SuggestionsService } from './infrastructure/services/SuggestionsService';
import { WeatherService } from './infrastructure/services/WeatherService';
import { GetCitySuggestions } from './application/useCases/GetCitySuggestions';
import { GetWeatherForecast } from './application/useCases/GetWeatherForecast';

// Define context interface
interface MyContext {
  getCitySuggestions: GetCitySuggestions;
  getWeatherForecast: GetWeatherForecast;
}

// Initialize services and use cases
const suggestionsService = new SuggestionsService();
const weatherService = new WeatherService();
const getCitySuggestions = new GetCitySuggestions(suggestionsService);
const getWeatherForecast = new GetWeatherForecast(weatherService);

// Create Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// Configure rate limiting (100 requests per minute per IP)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per IP
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit headers
  message: {
    message: 'Too many requests, please try again later.',
    status: 429,
  },
});

// Apply rate limiting to all requests
app.use(limiter);

// Create Apollo Server
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start the server and apply middleware
async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({
        getCitySuggestions,
        getWeatherForecast,
      }),
    })
  );

  // Start HTTP server
  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});