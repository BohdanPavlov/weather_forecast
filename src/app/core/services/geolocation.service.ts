import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Location } from 'src/app/core/types/location.type';
import { City } from 'src/app/features/forecast/types/city.type';

@Injectable({
	providedIn: 'root',
})
export class GeolocationService {
	private defaultLocation: Location = {
		latitude: 50.450001,
		longitude: 30.523333,
	};

	constructor(private http: HttpClient) {}

	public getDefaultCity(): Observable<City> {
		return this.http.get<City>(`locations/v1/cities/geoposition/search`, {
			params: {
				q: `${this.defaultLocation.latitude},${this.defaultLocation.longitude}`,
			},
		})
	}

	public getCityByCurrentLocation(): Observable<City> {
		return new Observable<City>(observer => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					position => {
						const latitude = position.coords.latitude;
						const longitude = position.coords.longitude;

						this.http.get<City>(`locations/v1/cities/geoposition/search`, {
							params: {
								q: `${latitude},${longitude}`,
							},
						}).subscribe(
							{
								next: (city: City) => {
									observer.next(city);
									observer.complete();
								},
								error: error => {
									console.error('Error getting default location:', error);
									observer.error(error);
								},
							},
						);
					},
					error => {
						console.error('Error getting default location:', error);
						observer.error(error);
					},
				);
			} else {
				console.error('Geolocation is not supported by this browser.');
				observer.error('Geolocation is not supported by this browser.');
			}
		});
	}
}
