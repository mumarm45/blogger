import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs/index';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private remainDataAfterNavigation = false;
  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.remainDataAfterNavigation) {
          this.remainDataAfterNavigation = false;
        } else {
          this.subject.next();
        }
      }
    });
  }
  success(message: string, remainDataAfterNavigation = false) {
    this.remainDataAfterNavigation = remainDataAfterNavigation;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, remainDataAfterNavigation = false) {
    this.remainDataAfterNavigation = remainDataAfterNavigation;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
