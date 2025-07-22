import { GetCitySuggestions } from '../../application/useCases/GetCitySuggestions';
import { GetWeatherForecast } from '../../application/useCases/GetWeatherForecast';
import { GetActivityRanking } from '../../application/useCases/GetActivityRanking';

interface Context {
    getCitySuggestions: GetCitySuggestions;
    getWeatherForecast: GetWeatherForecast;
    getActivityRanking: GetActivityRanking;
}

const resolvers = {
    Query: {
        citySuggestions: async (_: any, { partialName }: { partialName: string }, context: Context) => {
            return await context.getCitySuggestions.execute(partialName);
        },
        weatherForecast: async (_: any, { latitude, longitude }: { latitude: number; longitude: number }, context: Context) => {
            return await context.getWeatherForecast.execute(latitude, longitude);
        },
        activityRanking: async (_: any, { temperature, weatherCode }: { temperature: number; weatherCode: number }, context: Context) => {
            return await context.getActivityRanking.execute(temperature, weatherCode);
        }
    }
};

export default resolvers;