export class City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone?: string;
  population?: number;
  postcodes?: string[];
  country_id?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.elevation = data.elevation;
    this.feature_code = data.feature_code;
    this.country_code = data.country_code;
    this.admin1_id = data.admin1_id;
    this.admin2_id = data.admin2_id;
    this.admin3_id = data.admin3_id;
    this.admin4_id = data.admin4_id;
    this.timezone = data.timezone;
    this.population = data.population;
    this.postcodes = data.postcodes;
    this.country_id = data.country_id;
    this.country = data.country;
    this.admin1 = data.admin1;
    this.admin2 = data.admin2;
    this.admin3 = data.admin3;
    this.admin4 = data.admin4;
  }
}