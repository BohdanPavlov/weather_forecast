import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';

import { TemperatureService } from 'src/app/core/services/temperature.service';
import { FavouriteCity } from 'src/app/features/forecast/types/favourite-city.type';
import { WeatherForecastFor5Days } from 'src/app/features/forecast/types/weather-forecast-for-5-days.type';
import { City } from 'src/app/features/forecast/types/city.type';
import { CurrentLocationWeather } from 'src/app/features/forecast/types/current-location.type';
import { Forecast, ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';

@Injectable({
	providedIn: 'root',
})
export class ForecastService {

	constructor(private http: HttpClient, private temperatureService: TemperatureService) { }

	public getSearchedCity(searchValue: string): Observable<City> {
		return this.http.get<City[]>('locations/v1/cities/autocomplete', {
			params: {
				q: searchValue,
			},
		}).pipe(map((response: City[]) => response[0]));
	}

	public getCurrentLocationWeather(city: City): Observable<Forecast> {
		return this.http.get<CurrentLocationWeather[]>(`currentconditions/v1/${city.Key}`).
			pipe(map((response: CurrentLocationWeather[]): Forecast => {
				return {
					city,
					weather: response[0],
				};
			}));
	}

	public getWeatherForecastFor5Days(forecast: Forecast): Observable<ForecastWithDailyForecasts> {
		return this.http.get<WeatherForecastFor5Days>(`forecasts/v1/daily/5day/${forecast.city.Key}`, {
			params: {
				metric: 'true',
			},
		}).pipe(
			map((dailyForecasts: WeatherForecastFor5Days): ForecastWithDailyForecasts => {
				return {
					...forecast,
					dailyForecasts,
				};
			}),
		);
	}

	public getWeatherForecast(searchValue: string): Observable<Forecast> {
		return this.getSearchedCity(searchValue).pipe(
			concatMap((city: City) => {
				return this.getCurrentLocationWeather(city);
			}),
		);
	}

	public getWeatherForecastWithDailyForecasts(searchValue: string): Observable<ForecastWithDailyForecasts> {
		return this.getWeatherForecast(searchValue).pipe(
			concatMap((forecast: Forecast) => {
				return this.getWeatherForecastFor5Days(forecast);
			}),
		);
	}

	public mapForecastWithSelectedTemperatureUnit(
		forecast: ForecastWithDailyForecasts,
		unit: string,
	): ForecastWithDailyForecasts {
		const updatedForecast: ForecastWithDailyForecasts = JSON.parse(JSON.stringify(forecast));

		if (unit === 'C') {
			updatedForecast.weather.Temperature.Metric.Value = this.temperatureService.convertFahrenheitToCelsius(
				updatedForecast.weather.Temperature.Metric.Value);
			updatedForecast.weather.Temperature.Metric.Unit = 'C';
			updatedForecast.dailyForecasts.DailyForecasts.forEach((dailyForecast) => {
				dailyForecast.Temperature.Minimum.Value = this.temperatureService.convertFahrenheitToCelsius(
					dailyForecast.Temperature.Minimum.Value);
				dailyForecast.Temperature.Minimum.Unit = 'C';
				dailyForecast.Temperature.Maximum.Value = this.temperatureService.convertFahrenheitToCelsius(
					dailyForecast.Temperature.Maximum.Value);
				dailyForecast.Temperature.Maximum.Unit = 'C';
			});
		}

		if (unit === 'F') {
			updatedForecast.weather.Temperature.Metric.Value = this.temperatureService.convertCelsiusToFahrenheit(
				updatedForecast.weather.Temperature.Metric.Value);
			updatedForecast.weather.Temperature.Metric.Unit = 'F';
			updatedForecast.dailyForecasts.DailyForecasts.forEach((dailyForecast) => {
				dailyForecast.Temperature.Minimum.Value = this.temperatureService.convertCelsiusToFahrenheit(
					dailyForecast.Temperature.Minimum.Value);
				dailyForecast.Temperature.Minimum.Unit = 'F';
				dailyForecast.Temperature.Maximum.Value = this.temperatureService.convertCelsiusToFahrenheit(
					dailyForecast.Temperature.Maximum.Value);
				dailyForecast.Temperature.Maximum.Unit = 'F';
			});
		}

		return updatedForecast;
	}

	public mapFavouriteCitiesWithSelectedTemperatureUnit(
		favoriteCities: FavouriteCity[],
		unit: string,
	): FavouriteCity[] {
		const updatedFavoriteCities: FavouriteCity[] = JSON.parse(JSON.stringify(favoriteCities));

		if (unit === 'C') {
			updatedFavoriteCities.forEach((favoriteCity) => {
					if (favoriteCity.weather.unit === 'F') {
						favoriteCity.weather.value = this.temperatureService.convertFahrenheitToCelsius(
							favoriteCity.weather.value);
						favoriteCity.weather.unit = 'C';
					}
				},
			);
		}

		if (unit === 'F') {
			updatedFavoriteCities.forEach((favoriteCity) => {
					if (favoriteCity.weather.unit === 'C') {
						favoriteCity.weather.value = this.temperatureService.convertCelsiusToFahrenheit(
							favoriteCity.weather.value);
						favoriteCity.weather.unit = 'F';
					}
				},
			);
		}

		return updatedFavoriteCities;
	}
}
