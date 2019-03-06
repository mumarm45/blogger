/**
 * Created by mumarm45 on 22/02/2019.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticateService} from '../../service/authenticate.service';
import {take} from 'rxjs/internal/operators';
import {AlertService} from '../../service/alert.service';

@Component({templateUrl: 'login.component.html',
  styleUrls: ['./log.component.scss']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
        private authenticateService: AuthenticateService, private alertService: AlertService) {
      this.authenticateService.loginUserValue &&  this.router.navigate(['/blog']);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/blog';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) { return; }
        this.authenticateService.login(this.f.username.value, this.f.password.value)
            .pipe(take(1))
            .subscribe( data => { this.router.navigate([this.returnUrl]); },
              error => this.alertService.error(error));
    }
}
