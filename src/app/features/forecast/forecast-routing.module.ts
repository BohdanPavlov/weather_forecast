import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavouriteComponent } from 'src/app/features/forecast/pages/favourite/favourite.component';
import { HomeComponent } from 'src/app/features/forecast/pages/home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'favourite',
		component: FavouriteComponent,
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule,
	],
})

export class ForecastRoutingModule {}
