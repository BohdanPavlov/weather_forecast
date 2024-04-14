import { createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/core/types/app-state.interface';

export const selectFeature = (state: AppStateInterface) => state.forecast;

export const isLoadingSelector = createSelector(
	selectFeature,
	(state) => state.isLoading,
);

export const forecastSelector = createSelector(
	selectFeature,
	(state) => state.forecast,
);

export const favouriteSelector = createSelector(
	selectFeature,
	(state) => state.favourite,
);

export const isFavouriteCitySelector = createSelector(
	selectFeature,
	(state) => state.isFavouriteCity,
);

export const errorSelector = createSelector(
	selectFeature,
	(state) => state.error,
);
