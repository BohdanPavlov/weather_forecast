import { WeatherForecastFor5Days } from 'src/app/features/forecast/types/weather-forecast-for-5-days.type';
import { City } from 'src/app/features/forecast/types/city.type';
import { CurrentLocationWeather } from 'src/app/features/forecast/types/current-location.type';

export type Forecast = {
	city: City,
	weather: CurrentLocationWeather
}

export type ForecastWithDailyForecasts = Forecast & {
	dailyForecasts: WeatherForecastFor5Days
}
