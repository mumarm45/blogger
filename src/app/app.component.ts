import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './model/User';
import {AuthenticateService} from './service/authenticate.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  loginUser: User;
  loggedUserSub$: Subscription;

  constructor(private router: Router, private authenticateService: AuthenticateService) {
    this.loggedUserSub$ = this.authenticateService.loginUser.subscribe(loggedUser => {
      this.loginUser = loggedUser;
    });
  }


  logout() {
    this.authenticateService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.loggedUserSub$.unsubscribe();
  }
}
