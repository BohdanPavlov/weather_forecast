import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ForecastService } from 'src/app/features/forecast/services/forecast.service';
import { FavouriteCity } from 'src/app/features/forecast/types/favourite-city.type';
import { ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';

import * as ForecastActions from 'src/app/features/forecast/store/actions';

@Injectable()
export class ForecastEffects {
	getForecast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ForecastActions.getForecast),
			mergeMap(({ searchValue }) => {
				return this.forecastService.getWeatherForecastWithDailyForecasts(searchValue).
					pipe(
						map((forecast: ForecastWithDailyForecasts) => ForecastActions.getForecastSuccess({ forecast: forecast })),
					);
			}),
			catchError((error) => of(ForecastActions.getForecastFailure({ error: error.message }))),
		),
	);

	addCityToFavourite$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ForecastActions.addCityToFavourite),
			tap((favouriteCity) => {
				const favourite: FavouriteCity[] = this.localStorageService.get('favourite');
				favourite.push(favouriteCity);
				this.localStorageService.set('favourite', favourite);
			}),
		), { dispatch: false },
	);

	removeCityFromFavourite$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ForecastActions.removeCityFromFavourite),
			tap(({ id }) => {
				const favourite: FavouriteCity[] = this.localStorageService.get('favourite');
				const updatedFavourite = favourite.filter((fav) => fav.id !== id);
				this.localStorageService.set('favourite', updatedFavourite);
			}),
		), { dispatch: false },
	);

	constructor(
		private actions$: Actions,
		private forecastService: ForecastService,
		private localStorageService: LocalStorageService,
	) {}
}
