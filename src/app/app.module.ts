import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgChartsModule } from 'ng2-charts';

import { CoreModule } from 'src/app/core/core.module';
import { ApiKeyInterceptor } from 'src/app/core/interceptors/api-key.interceptor';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgChartsModule,
		CoreModule,
		HttpClientModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot(),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
			autoPause: true,
			features: {
				pause: false,
				lock: true,
				persist: true,
			},
		}),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
