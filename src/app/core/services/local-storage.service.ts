import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {

	public get(key: string): any {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	public set(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	}
}
