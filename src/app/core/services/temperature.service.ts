import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TemperatureService {

	public convertCelsiusToFahrenheit(celsius: number): number {
		return Number(((celsius * 9/5) + 32).toFixed(1));
	}

	public convertFahrenheitToCelsius(fahrenheit: number): number {
		return Number(((fahrenheit - 32) * 5/9).toFixed(1));
	}
}
