import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticateService} from '../../service/authenticate.service';
import {UserService} from '../../service/user.service';
import {first} from 'rxjs/internal/operators';
import {AlertService} from '../../service/alert.service';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder, private router: Router,
        private authenticateService: AuthenticateService,
        private userService: UserService, private alertService: AlertService
    ) {
      this.authenticateService.loginUserValue && this.router.navigate(['/blog']);
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/user/login']);
                },
                error => {
                  this.alertService.error(error);
                });
    }
}
