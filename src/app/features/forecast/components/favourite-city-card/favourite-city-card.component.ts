import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStateInterface } from 'src/app/core/types/app-state.interface';
import { getForecast } from 'src/app/features/forecast/store/actions';
import { getWeatherIcon } from 'src/app/core/utils/get-weather-icon.util';
import { FavouriteCity } from 'src/app/features/forecast/types/favourite-city.type';

@Component({
	selector: 'app-favourite-city-card',
	templateUrl: './favourite-city-card.component.html',
	styleUrls: ['./favourite-city-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteCityCardComponent {
	@Input() favourite!: FavouriteCity;

	constructor(private store: Store<AppStateInterface>, private router: Router) {}

	public getWeatherIcon(id: number): string {
		return getWeatherIcon(id);
	};

	public showDetailedInfo(cityName: string): void {
		this.router.navigate(['/favourite']);
		this.store.dispatch(getForecast({ searchValue: cityName }));
	}
}
