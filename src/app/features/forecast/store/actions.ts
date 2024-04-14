import { createAction, props } from '@ngrx/store';

import { ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';
import { FavouriteCity } from 'src/app/features/forecast/types/favourite-city.type';

export const getForecast = createAction('[Forecast] Get Forecast', props<{ searchValue: string }>());

export const getForecastSuccess = createAction(
	'[Forecast] Get Forecast Success',
	props<{ forecast: ForecastWithDailyForecasts }>(),
);

export const getForecastFailure = createAction(
	'[Forecast] Get Forecast Failure',
	props<{ error: string }>(),
);

export const addCityToFavourite = createAction(
	'[Favourite] Add City To Favourite',
	props<FavouriteCity>(),
);

export const removeCityFromFavourite = createAction(
	'[Favourite] Remove City From Favourite',
	props<{ id: string }>(),
);

export const updateForecast = createAction(
	'[Forecast] Update Forecast',
	props<{ forecast: ForecastWithDailyForecasts }>(),
);

export const updateFavourites = createAction(
	'[Forecast] Update Favourites',
	props<{ favourite: FavouriteCity[] }>(),
);

