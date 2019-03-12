import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {fakeBackendProvider} from './interceptor/fack-server.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtTokenInterceptor} from './interceptor/jwt.token.interceptor';
import {AlertComponent} from './component/alert/alert.component';
import {ErrorInterceptor} from './interceptor/error.interceptor';
import { BlogComponent } from './component/blog/blog.component';
import { BlogViewComponent } from './component/blog/blog-view/blog-view.component';
import {MaterialModule} from './material-module/material-module.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { BlogShowComponent } from './component/blog/blog-show/blog-show.component';
import {FlexAlignDirective, FlexLayoutModule} from '@angular/flex-layout';
import {AddCommentComponent} from "./component/add-comment/add-comment.component";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    BlogComponent,
    BlogViewComponent,
    PageNotFoundComponent,
    BlogShowComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule, FlexLayoutModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtTokenInterceptor,
    multi: true
  },
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
