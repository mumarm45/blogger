import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './model/User';
import {AuthenticateService} from './service/authenticate.service';
import {Subscription} from 'rxjs/index';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  loginUser: User;
  loggedUserSub$: Subscription;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(private router: Router, private authenticateService: AuthenticateService, changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.loggedUserSub$ = this.authenticateService.loginUser.subscribe(loggedUser => {
      this.loginUser = loggedUser;
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  logout() {
    this.authenticateService.logout();
    this.router.navigate(['/blog']);
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.loggedUserSub$.unsubscribe();
  }
}
