import { createReducer, on } from '@ngrx/store';

import { ForecastStateInterface } from 'src/app/features/forecast/types/forecast-state.interface';
import * as ForecastActions from 'src/app/features/forecast/store/actions';

export const initialState: ForecastStateInterface = {
	isLoading: true,
	forecast: null,
	favourite: JSON.parse(localStorage.getItem('favourite') ?? '[]'),
	isFavouriteCity: false,
	error: null,
};

export const reducers = createReducer(
	initialState,
	on(ForecastActions.getForecast, (state) => ({
			...state,
			isLoading: true,
			forecast: null,
			error: null,
		}),
	),
	on(ForecastActions.getForecastSuccess, (state, action) => ({
			...state,
			isLoading: false,
			forecast: action.forecast,
			isFavouriteCity: state.favourite.some(({ id }) => action.forecast.city.AdministrativeArea.ID === id),
		}),
	),
	on(ForecastActions.getForecastFailure, (state, action) => ({
			...state,
			isLoading: false,
			error: action.error,
		}),
	),
	on(ForecastActions.addCityToFavourite, (state, action) => ({
			...state,
			favourite: [...state.favourite, action],
			isFavouriteCity: true,
		}),
	),
	on(ForecastActions.removeCityFromFavourite, (state, action) => ({
			...state,
			favourite: state.favourite.filter(({ id }) => id !== action.id),
			isFavouriteCity: false,
		}),
	),
	on(ForecastActions.updateForecast, (state, action) => ({
			...state,
			forecast: action.forecast,
		}),
	),
	on(ForecastActions.updateFavourites, (state, action) => ({
			...state,
			favourite: action.favourite,
		}),
	),
);
