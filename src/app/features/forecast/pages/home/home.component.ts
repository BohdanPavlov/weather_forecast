import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
	errorSelector,
	forecastSelector,
	isLoadingSelector,
} from 'src/app/features/forecast/store/selectors';
import { ForecastWithDailyForecasts } from 'src/app/features/forecast/types/forecast.type';
import { AppStateInterface } from 'src/app/core/types/app-state.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	public isChartVisible = false;
	public isLoading$: Observable<boolean>;
	public forecast$: Observable<ForecastWithDailyForecasts | null>;
	public error$: Observable<string | null>;

	constructor(private store: Store<AppStateInterface>) {
		this.isLoading$ = this.store.pipe(select(isLoadingSelector));
		this.forecast$ = this.store.pipe(select(forecastSelector));
		this.error$ = this.store.pipe(select(errorSelector));
	}

	public onToggleChart(isChartVisible: boolean): void {
		this.isChartVisible = isChartVisible;
	}
}
