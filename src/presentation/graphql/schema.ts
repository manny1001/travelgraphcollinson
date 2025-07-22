import { gql } from 'apollo-server';

const typeDefs = gql`
  type City {
    id: Int!
    name: String!
    latitude: Float!
    longitude: Float!
    elevation: Float
    feature_code: String
    country_code: String
    admin1_id: Int
    admin2_id: Int
    admin3_id: Int
    admin4_id: Int
    timezone: String
    population: Int
    postcodes: [String!]
    country_id: Int
    country: String
    admin1: String
    admin2: String
    admin3: String
    admin4: String
  }

  type Activity {
    name: String!
    ranking: Int!
  }

  type WeatherForecast {
    temperature: Float!
    condition: String!
    weatherCode: Int!
  }

  type Query {
    citySuggestions(partialName: String!): [City!]!
    weatherForecast(latitude: Float!, longitude: Float!): WeatherForecast
    activityRanking(temperature: Float!, weatherCode: Int!): [Activity!]!
  }
`;

export default typeDefs;