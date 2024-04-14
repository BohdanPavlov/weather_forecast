import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppStateInterface } from 'src/app/core/types/app-state.interface';
import { favouriteSelector } from 'src/app/features/forecast/store/selectors';
import { FavouriteCity } from 'src/app/features/forecast/types/favourite-city.type';

@Component({
	selector: 'app-favourite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favourite.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteComponent {
	public favourite$: Observable<FavouriteCity[]>;

	constructor(private store: Store<AppStateInterface>) {
		this.favourite$ = this.store.pipe(select(favouriteSelector));
	}

	public trackByFn(index: number, item: FavouriteCity): string {
		return item.id;
	}
}
