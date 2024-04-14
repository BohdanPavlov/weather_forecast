import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';

@Component({
	selector: 'app-daily-forecast-line-chart',
	templateUrl: './daily-forecast-line-chart.component.html',
	styleUrls: ['./daily-forecast-line-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyForecastLineChartComponent implements OnInit {
	@Input() forecast!: ForecastWithDailyForecasts;

	public lineChartData!: ChartConfiguration<'line'>['data'];

	public lineChartOptions: ChartOptions<'line'> = {
		responsive: true,
	};

	public lineChartLegend = true;

	public ngOnInit(): void {
		this.lineChartData = {
			labels: this.forecast.dailyForecasts.DailyForecasts.map(
				(weekDay) => new Date(weekDay.Date).toLocaleDateString('en-US', { weekday: 'short' })),
			datasets: [
				{
					data: this.forecast.dailyForecasts.DailyForecasts.map((day) => day.Temperature.Maximum.Value),
					label: 'Day °C',
					fill: false,
					tension: 0.5,
					borderColor: 'black',
					backgroundColor: 'rgba(0,0,255,0.5)',
					pointBackgroundColor: 'rgba(0,0,255,1)',
					pointRadius: 5,
				},
				{
					data: this.forecast.dailyForecasts.DailyForecasts.map((day) => day.Temperature.Minimum.Value),
					label: 'Night °C',
					fill: false,
					tension: 0.5,
					borderColor: 'black',
					backgroundColor: 'rgba(0,0,0,0.5)',
					pointBackgroundColor: 'rgba(0,0,0,1)',
					pointRadius: 5,
				},
			],
		};
	}
}
