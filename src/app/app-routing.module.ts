import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogComponent} from './component/blog/blog.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BlogShowComponent} from './component/blog/blog-show/blog-show.component';
import {AuthGuard} from "./route/auth.guard";

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'blog/show/:id', component: BlogShowComponent },
  {path: 'user',  loadChildren: './user-management/user-management.module#UserManagementModule'},
  {path: 'blog/create',  loadChildren: './blog-create/blog-create.module#BlogCreateModule'},
  { path: '**', component: PageNotFoundComponent },
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
