import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AppStateInterface } from 'src/app/core/types/app-state.interface';
import * as ForecastActions from 'src/app/features/forecast/store/actions';

@Component({
	selector: 'app-search-city-form',
	templateUrl: './search-city-form.component.html',
	styleUrls: ['./search-city-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCityFormComponent implements OnInit {
	private searchSubject: Subject<string> = new Subject<string>();
	private readonly debounceTimeMs = 500;

	public search: FormControl = new FormControl<string>('');

	constructor(private store: Store<AppStateInterface>) {}

	public ngOnInit(): void {
		this.searchSubject.pipe(debounceTime(this.debounceTimeMs), distinctUntilChanged()).subscribe((searchValue) => {
			if (!searchValue) return;
			this.store.dispatch(ForecastActions.getForecast({ searchValue }));
		});
	}

	public onSearch(): void {
		this.searchSubject.next(this.search.value);
	}
}
