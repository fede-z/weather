export interface WeatherData {
    current:CurrentWeather;
    location:Location;
    forecast:Forecast;
}

export interface CurrentWeather{
    temp_c: number;
    feelslike_c: number;
    is_day: number;
    condition: {text:string, code:number};
    wind_kph: number;
    wind_degree: number;
    humidity: number;
    vis_km: number;
    pressure_mb: number;

}
export interface Location{
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
    localtime_epoch: number;
    tz_id: string;
}
export interface Forecast{
    forecastday :any
}

export interface WeatherDataML{
    temp_c: number;
    feelslike_c: number;
    wind_kph: number;
    wind_degree: number;
    humidity: number;
    vis_km: number;
    pressure_mb: number;
    summary: number;

}
export interface WeatherDataMLOutput{
    apparent_temperature:number;
}