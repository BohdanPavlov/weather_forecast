import { ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';
import { FavouriteCity } from 'src/app/features/forecast/types/favourite-city.type';

export interface ForecastStateInterface {
	isLoading: boolean;
	forecast: ForecastWithDailyForecasts | null;
	favourite: FavouriteCity[];
	isFavouriteCity: boolean;
	error: string | null;
}
