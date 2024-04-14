import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
	private apiKey = environment.apiKey;
	private apiBaseUrl = environment.apiBaseUrl;

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		const modifiedRequest = request.clone({
			url: `${this.apiBaseUrl}/${request.url}`,
			setParams: {
				apikey: this.apiKey,
			},
		});

		return next.handle(modifiedRequest);
	}
}
