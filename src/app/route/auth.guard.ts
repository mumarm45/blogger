import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthenticateService} from '../service/authenticate.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticateService: AuthenticateService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticateService.loginUserValue;
        if (currentUser) {
            return true;
        }
        this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
