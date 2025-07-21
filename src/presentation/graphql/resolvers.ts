import { GetCitySuggestions } from '../../application/useCases/GetCitySuggestions';
import { GetWeatherForecast } from '../../application/useCases/GetWeatherForecast';

interface Context {
    getCitySuggestions: GetCitySuggestions;
    getWeatherForecast: GetWeatherForecast;
}

const resolvers = {
    Query: {
        citySuggestions: async (_: any, { partialName }: { partialName: string }, context: Context) => {
            return await context.getCitySuggestions.execute(partialName);
        },
        weatherForecast: async (_: any, { latitude, longitude }: { latitude: number; longitude: number }, context: Context) => {
            return await context.getWeatherForecast.execute(latitude, longitude);
        }
    }
};

export default resolvers;