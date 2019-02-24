/**
 * Created by mumarm45 on 22/02/2019.
 */
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/internal/operators';
import {User} from '../model/User';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
  private loginUserSubject: BehaviorSubject<User>;
  public loginUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.loginUserSubject = new BehaviorSubject<User>(null);
    this.loginUser = this.loginUserSubject.asObservable();
  }

  public get loginUserValue(): User {
    return this.loginUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        if (user && user.token) { this.loginUserSubject.next(user); }
        return user;
      }));
  }

  logout() {
    this.loginUserSubject.next(null);
  }
}
