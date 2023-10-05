import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let loginService = this.inject.get(LoginService);
    // let jwtToken = req.clone({
    //   setHeaders: {
    //     Authorization: 'bearer ' + loginService.getTokenValue(),
    //   },
    // });
    let authRequest = req;
    authRequest = this.AddTokenHandler(req, loginService.getTokenValue());
    return next.handle(authRequest).pipe(
      catchError((errorData) => {
        if (errorData.status === 401) {
          // console.log(errorData);
          // loginService.logOut();

          return this.handleRefreshToken(req, next);
        }
        return throwError(errorData);
      })
    );
  }
  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    let loginService = this.inject.get(LoginService);
    return loginService.generateRefreshToken().pipe(
      switchMap((data: any) => {
        loginService.saveTokens(data.data);
        return next.handle(this.AddTokenHandler(request, data.data.token));
      }),
      catchError((errorData) => {
        loginService.logOut();
        return throwError(errorData);
      })
    );
  }

  AddTokenHandler(request: HttpRequest<any>, token: any) {
    return request.clone({
      headers: request.headers.set('Authorization', 'bearer ' + token),
    });
  }
}
