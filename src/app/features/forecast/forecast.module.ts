import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgChartsModule } from 'ng2-charts';

import { ForecastRoutingModule } from 'src/app/features/forecast/forecast-routing.module';
import { FavouriteComponent } from 'src/app/features/forecast/pages/favourite/favourite.component';
import { HomeComponent } from 'src/app/features/forecast/pages/home/home.component';
import { ForecastEffects } from 'src/app/features/forecast/store/effects';
import { reducers } from 'src/app/features/forecast/store/reducers';
import { MaterialModule } from 'src/app/shared/material.module';
import { FavouriteCityCardComponent } from './components/favourite-city-card/favourite-city-card.component';
import { CityWeatherCardComponent } from './components/city-weather-card/city-weather-card.component';
import { DailyWeatherForecastComponent } from './components/daily-weather-forecast/daily-weather-forecast.component';
import { SearchCityFormComponent } from './components/search-city-form/search-city-form.component';
import {
	DailyForecastLineChartComponent,
} from './components/daily-forecast-line-chart/daily-forecast-line-chart.component';

@NgModule({
	declarations: [
		HomeComponent,
		FavouriteComponent,
		FavouriteCityCardComponent,
		CityWeatherCardComponent,
		DailyWeatherForecastComponent,
		SearchCityFormComponent,
		DailyForecastLineChartComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		NgOptimizedImage,
		ReactiveFormsModule,
		ForecastRoutingModule,
		StoreModule.forFeature('forecast', reducers),
		EffectsModule.forFeature([ForecastEffects]),
		NgChartsModule,
	],
})
export class ForecastModule {}
