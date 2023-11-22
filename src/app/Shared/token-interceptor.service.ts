import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { LoginService } from '../Services/login.service';
import { APIResponse } from '../DTO/APIResponse';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private loginSvc: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authRequest = req;
    authRequest = this.AddTokenHandler(req, this.loginSvc.getTokenValue());
    return next.handle(authRequest).pipe(
      catchError((errorData) => {
        if (errorData.status === 401) {
          return this.handleRefreshToken(req, next);
        }
        return throwError(errorData);
      })
    );
  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.loginSvc.generateRefreshToken().pipe(
      switchMap((APIResponse: APIResponse) => {
        this.loginSvc.setData(APIResponse);
        return next.handle(
          this.AddTokenHandler(request, APIResponse.data.token)
        );
      }),
      catchError((errorData) => {
        console.log('Refreshtoken Generation error');
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
