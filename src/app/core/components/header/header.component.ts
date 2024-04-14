import { Component, EventEmitter, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject, take, takeUntil } from 'rxjs';

import { AppStateInterface } from 'src/app/core/types/app-state.interface';
import { ForecastService } from 'src/app/features/forecast/services/forecast.service';
import { favouriteSelector, forecastSelector } from 'src/app/features/forecast/store/selectors';
import { FavouriteCity } from 'src/app/features/forecast/types/favourite-city.type';
import { ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';
import * as ForecastActions from 'src/app/features/forecast/store/actions';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	@Output() themeSwitched: EventEmitter<boolean> = new EventEmitter<boolean>();

	public isDarkMode = false;
	public temperatureUnit = 'C';

	public forecast$: Observable<ForecastWithDailyForecasts | null>;
	public favourite$: Observable<FavouriteCity[]>;
	public destroy$: Subject<void> = new Subject<void>();

	constructor(private forecastService: ForecastService, private store: Store<AppStateInterface>) {
		this.forecast$ = this.store.pipe(select(forecastSelector));
		this.favourite$ = this.store.pipe(select(favouriteSelector));
	}

	public onToggleTheme(): void {
		this.isDarkMode = !this.isDarkMode;
		this.themeSwitched.emit(this.isDarkMode);
	}

	public onToggleTemperatureUnit(): void {
		combineLatest([this.forecast$, this.favourite$]).
			pipe(take(1), takeUntil(this.destroy$)).
			subscribe(([forecast, favourites]) => {
				this.temperatureUnit = this.temperatureUnit === 'C' ? 'F' : 'C';

				if (forecast) {
					const updatedForecast = this.forecastService.mapForecastWithSelectedTemperatureUnit(forecast,
						this.temperatureUnit);
					this.store.dispatch(ForecastActions.updateForecast({ forecast: updatedForecast }));
				}

				const updatedFavourites: FavouriteCity[] = this.forecastService.mapFavouriteCitiesWithSelectedTemperatureUnit(
					favourites, this.temperatureUnit);
				this.store.dispatch(ForecastActions.updateFavourites({ favourite: updatedFavourites }));
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
