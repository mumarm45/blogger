/**
 * Created by mumarm45 on 22/02/2019.
 */
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {AuthenticateService} from "../service/authenticate.service";



@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private authenticateService: AuthenticateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticateService.loginUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
