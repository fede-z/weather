import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherDataML,WeatherDataMLOutput } from '../models/weather.model';


@Injectable({
  providedIn: 'root'
})
export class MlService {
  baseURL = "http://localhost:5000/";

  constructor(private http:HttpClient) { }

  // Metodo che effettua una richiesta HTTP POST al server Flask
  getApparentTemperaturePredicted(dati:WeatherDataML){
    let request = "predict"
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json'); 
    const body = JSON.stringify(dati)
    return this.http.post<WeatherDataMLOutput>(this.baseURL + request, body, {'headers':headers})
  }
}
