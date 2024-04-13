import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://api.weatherapi.com/v1/current.json?key=bb5d5e5039cb4d57b23190607240904&q=Seattle'; // current weather

  constructor(private http: HttpClient) {}

  // Get weather of a 'location'
  getWeather(location:string): Observable<any> {
    var apiUrl_ = this.apiUrl + location
    return this.http.get<any>(this.apiUrl);
  }
}