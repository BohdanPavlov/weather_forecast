import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { AppStateInterface } from 'src/app/core/types/app-state.interface';
import * as ForecastActions from 'src/app/features/forecast/store/actions';
import {
	favouriteSelector,
	forecastSelector,
	isFavouriteCitySelector,
} from 'src/app/features/forecast/store/selectors';
import { FavouriteCity } from 'src/app/features/forecast/types/favourite-city.type';
import { ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';
import { getWeatherIcon } from 'src/app/core/utils/get-weather-icon.util';

@Component({
	selector: 'app-city-weather-card',
	templateUrl: './city-weather-card.component.html',
	styleUrls: ['./city-weather-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityWeatherCardComponent {
	@Input() isChartVisible = false;
	@Output() toggleChart = new EventEmitter<boolean>();

	public forecast$: Observable<ForecastWithDailyForecasts | null>;
	public favourite$: Observable<FavouriteCity[]>;
	public isFavouriteCity$: Observable<boolean>;

	constructor(private store: Store<AppStateInterface>) {
		this.forecast$ = this.store.pipe(select(forecastSelector));
		this.favourite$ = this.store.pipe(select(favouriteSelector));
		this.isFavouriteCity$ = this.store.pipe(select(isFavouriteCitySelector));
	}

	public getWeatherIcon(icon: number): string {
		return getWeatherIcon(icon);
	}

	public onToggleFavourite(forecast: ForecastWithDailyForecasts): void {
		this.favourite$.pipe(take(1)).subscribe((favourite) => {
			if (favourite.some(({ id }) => id === forecast.city.AdministrativeArea.ID)) {
				this.store.dispatch(ForecastActions.removeCityFromFavourite({ id: forecast.city.AdministrativeArea.ID }));
			} else {
				const favouriteCity: FavouriteCity = {
					id: forecast.city.AdministrativeArea.ID,
					name: forecast.city.LocalizedName,
					weather: {
						icon: forecast.weather.WeatherIcon,
						value: forecast.weather.Temperature.Metric.Value,
						unit: forecast.weather.Temperature.Metric.Unit,
					},
				};
				this.store.dispatch(ForecastActions.addCityToFavourite(favouriteCity));
			}
		});
	}

	public onToggleChart(): void {
		this.toggleChart.emit(!this.isChartVisible);
	}
}
