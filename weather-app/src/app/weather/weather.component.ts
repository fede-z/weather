import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData, WeatherDataML } from '../models/weather.model';
import { MlService } from '../services/ml.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherData?: WeatherData;
  weatherData_ml?: WeatherDataML;
  location: string = 'Brescia';
  is_day: boolean = true;
  error: boolean = false;
  error_msg: string = "";
  apparent_temperature?: number;

  constructor(private weatherService: WeatherService, private mlService:MlService) {
  }

  ngOnInit(): void {
    this.getWeather(this.location);
    this.location = "";
  }

  onSubmit(){
    this.getWeather(this.location);
    this.location = "";
  }

  private getWeather(location: string){
    if (location != ""){
      this.weatherService.getWeather(location).subscribe({
        next: (response) =>{
          console.log(response);
          this.weatherData = response;

          // Setto variabile is_day per cambio sfondo
          if(this.weatherData.current.is_day == 1) this.is_day = true
          else this.is_day = false

          this.error = false;

          // Preparazione dati per predizione temperatura percepita
          this.weatherData_ml = {
            temp_c: this.weatherData.current.temp_c,
            feelslike_c: this.weatherData.current.feelslike_c,
            wind_kph: this.weatherData.current.wind_kph,
            wind_degree: this.weatherData.current.wind_degree,
            humidity: this.weatherData.current.humidity,
            vis_km: this.weatherData.current.vis_km,
            pressure_mb: this.weatherData.current.pressure_mb,
            summary:this.weatherData.current.condition.code,
          }
          this.getApparentTemperaturePredicted(this.weatherData_ml)
          
        },
        error:(err) =>{
            console.log(err)
            this.error = true;
            this.weatherData = undefined;
            this.error_msg = err.error.error.message;
        }
      });
    }
  }

  private getApparentTemperaturePredicted(dati:WeatherDataML){
    this.mlService.getApparentTemperaturePredicted(dati).subscribe({
      next: (response) =>{
        console.log(response);
        this.apparent_temperature = response.apparent_temperature;
        
      },
      error:(err) =>{
          this.apparent_temperature = undefined;
          console.log(err);
      }
    })
  }


}
