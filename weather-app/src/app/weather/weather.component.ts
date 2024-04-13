import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    var location = "New York"
    this.weatherService.getWeather(location).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData)
    });
  }

}
