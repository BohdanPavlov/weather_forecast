import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { getWeatherIcon } from 'src/app/core/utils/get-weather-icon.util';
import { ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';

@Component({
	selector: 'app-daily-weather-forecast',
	templateUrl: './daily-weather-forecast.component.html',
	styleUrls: ['./daily-weather-forecast.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherForecastComponent {
	@Input() forecast!: ForecastWithDailyForecasts;

	public getWeatherIcon(icon: number): string {
		return getWeatherIcon(icon);
	}
}
