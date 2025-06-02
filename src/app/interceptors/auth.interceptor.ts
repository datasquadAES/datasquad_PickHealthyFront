import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtener el usuario del sessionStorage y parsear a objeto
    const userString = sessionStorage.getItem('user');
    let token: any = null;
    if (userString) {
      try {
        token = JSON.parse(userString);
      } catch (e) {
        token = null;
      }
    }

    // Solo agregar el header si existe el token y el campo secret
    if (token?.secret) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.secret}`
        }
      });
      return next.handle(authReq);
    }

    // Si no hay token, continuar sin modificar la request
    return next.handle(request);
  }
}
