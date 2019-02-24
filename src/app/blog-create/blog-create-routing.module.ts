import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogCreateComponent} from './blog-create/blog-create.component';
import {AuthGuard} from "../route/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: BlogCreateComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogCreateRoutingModule { }
