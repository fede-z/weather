import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://api.weatherapi.com/v1/current.json?key=bb5d5e5039cb4d57b23190607240904&q='; // current weather

  constructor(private http: HttpClient) {}

  // Metodo che effettua una HTTP GET
  getWeather(location:string): Observable<WeatherData> {
    var apiUrl_ = this.apiUrl + location
    return this.http.get<WeatherData>(apiUrl_);
  }
}