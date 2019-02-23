import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from '../component/register/register.component';
import {LoginComponent} from '../component/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UMRoutingModule} from './user-management.routing';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule, UMRoutingModule
  ],
  exports: [ LoginComponent,
    RegisterComponent]
})
export class UserManagementModule { }
