import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';

import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { getForecast, getForecastFailure } from 'src/app/features/forecast/store/actions';
import { City } from 'src/app/features/forecast/types/city.type';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

	constructor(
		private localStorageService: LocalStorageService,
		private geolocationService: GeolocationService,
		private store: Store,
		private renderer: Renderer2,
		@Inject(DOCUMENT) private document: Document,
	) {}

	public ngOnInit() {
		if (!this.localStorageService.get('favourite')) {
			this.localStorageService.set('favourite', []);
		}

		this.geolocationService.getDefaultCity().subscribe({
			next: (city: City): void => {
				this.store.dispatch(getForecast({ searchValue: city.AdministrativeArea.LocalizedName }));
			},
			error: error => {
				this.store.dispatch(getForecastFailure({ error: error.message }));
			},
		});

		// this.geolocationService.getCityByCurrentLocation().subscribe({
		// 	next: (city: City): void => {
		// 		this.store.dispatch(getForecast({ searchValue: city.AdministrativeArea.LocalizedName }));
		// 	},
		// 	error: error => {
		// 		this.store.dispatch(getForecastFailure({ error: error.message }));
		// 	},
		// });
	}

	public switchMode(isDarkMode: boolean): void {
		const theme = isDarkMode ? 'theme-dark' : 'theme-light';
		this.renderer.setAttribute(this.document.body, 'class', theme);
	}
}
