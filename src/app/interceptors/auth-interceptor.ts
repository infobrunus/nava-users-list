import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRequest = request.clone({
      setHeaders: {
        'app-id': '64b53aa7c89880a234d2af51',
        Authorization: 'Bearer 64b53aa7c89880a234d2af51',
        'Content-Type': 'application/json'
      },
    });
    return next.handle(authRequest);
  }
}