import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticateService} from '../service/authenticate.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
/**
 * Created by mumarm45 on 22/02/2019.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticateService: AuthenticateService,  private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      err.status === 401 && this.router.navigate(['/user/login']);

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
