import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogComponent} from './component/blog/blog.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  {path: 'user',  loadChildren: './user-management/user-management.module#UserManagementModule'},
  {path: 'blog/create',  loadChildren: './blog-create/blog-create.module#BlogCreateModule'},

  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
