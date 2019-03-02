/**
 * Created by mumarm45 on 22/02/2019.
 */
import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs/index';
import {mergeMap} from 'rxjs/internal/operators';
import {User} from '../model/User';
import {Blog} from '../model/Blog';
import {Comment} from '../model/Comment';

@Injectable({
  providedIn: 'root'
})
export class FackServerService implements HttpInterceptor {
  users: User[] = [{
    id: '1',
    createdAt: '2019-02-16T22:24:20.035Z',
    name: 'Alvina Grady',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/smalonso/128.jpg',
    username: 'admin',
    password: 'admin',
    token: '',
  }];
  bloggers: Blog[] = [{
    id: '1',
    userId: '1',
    createdAt: '2019-02-16T14:26:44.988Z',
    name: 'Roma Harber',
    avatar: 'http://lorempixel.com/640/480/nature',
    blogImage: 'http://lorempixel.com/640/480/food', tags: 'tags 1 | tag2 | tag3',
    likes: 96,
    title: 'First Blog',
    description: 'Customer' },
    {
    id: '2',
    userId: '1',
    createdAt: '2019-02-16T14:26:44.988Z',
    name: 'Muhamamd Omar',
      title: 'First Blog',
    avatar: 'http://lorempixel.com/640/480/nature',
    blogImage: 'http://lorempixel.com/640/480/food', tags: 'tags 1 | tag2 | tag3',
    likes: 100,
    description: 'First post created' }
    ];
  comments: Comment[] = [{
    id: '1',
    blogId: '1',
    createdAt: '2019-02-16T21:17:25.567Z',
    comment: 'Human',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kimcool/128.jpg', }];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const filteredUsers = this.users.filter(user => {
          return user.username === request.body.username && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          const user = filteredUsers[0];
          const body = {...user, token: 'fake-jwt-token'// token can be generated
          };

          return of(new HttpResponse({ status: 200, body }));
        } else {
          return throwError({ error: { message: 'Username or password is incorrect' } });
        }
      }

      if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
       // check the token
         if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const urlParts = request.url.split('/');
          const matchedUsers = this.users.filter((user: User) => user.id === urlParts[urlParts.length - 1]);
          const user = matchedUsers.length ? matchedUsers[0] : null;
          return of(new HttpResponse({ status: 200, body: user }));
        } else {
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
      }

      if (request.url.endsWith('/users/register') && request.method === 'POST') {
        const newUser = request.body;
        const duplicateUser = this.users.filter(user =>   user.username === newUser.username).length;
        if (duplicateUser) {
          return throwError({ error: { message: 'Username "' + newUser.username + '" is already exist' } });
        }
        newUser.id = (this.users.length + 1).toString();
        this.users.push(newUser);
        return of(new HttpResponse({ status: 200 }));
      }

      if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
          if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const urlParts = request.url.split('/');
          const id = urlParts[urlParts.length - 1];
          for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            if (user.id === id) {
              this.users.splice(i, 1);
              break;
            }
          }
          return of(new HttpResponse({ status: 200 }));
        } else {
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
      }

      if (request.url.match('/blogs/like') && request.method === 'PUT') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const updateBlog = request.body;
          const id = updateBlog.blogId;
          // this.bloggers = this.bloggers.map(b => {
          //   if (b.id === id) {
          //     b.likes++;
          //   }
          //   return b;
          // });
          const blogIndex = this.bloggers.findIndex(b => b.id === id);
          if (blogIndex === -1) {
            return throwError({ error: { message:  'Blog does not exist' }});
          }
          this.bloggers[blogIndex].likes++;
          return of(new HttpResponse({ status: 200 }));
        } else {
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
      }


      if (request.url.match('/blogs') && request.method === 'GET') {
        // check the token
        return of(new HttpResponse({status: 200, body: this.bloggers}));
      }
      if (request.url.match('/comments') && request.method === 'GET') {
        // check the token
        return of(new HttpResponse({status: 200, body: this.comments}));
      }

      if (request.url.match('/comments/add') && request.method === 'POST') {
        // check the token
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const newComment = request.body;
          newComment.id = (this.comments.length + 1).toString();
          newComment.createdAt = new Date().toDateString();
          this.comments.push(newComment);
          return of(new HttpResponse({ status: 200, body : newComment }));
        } else {
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
      }
      if (request.url.match('/blogs/add') && request.method === 'POST') {
        // check the token
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const newBlog = request.body;
          newBlog.id = (this.bloggers.length + 1).toString();
          newBlog.createdAt = new Date().toDateString();
          this.bloggers.push(newBlog);
          return of(new HttpResponse({ status: 200 }));
        } else {
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
      }

      return next.handle(request);
    }));

  }
  constructor() { }


}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FackServerService,
  multi: true
};
