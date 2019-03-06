/**
 * Created by mumarm45 on 22/02/2019.
 */
import {Injectable} from '@angular/core';
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
    password: 'admin123',
    token: '',
  }];
  bloggers: Blog[] = [{
    id: '1',
    userId: '1',
    createdAt: '2019-02-16T14:26:44.988Z',
    name: 'Roma Harber',
    avatar: 'http://lorempixel.com/640/480/nature',
    blogImage: 'https://s3.amazonaws.com/bloovofilesproduction/blogs_avatars/original_3u_p092z5?1512078161', tags: 'tags 1 | tag2 | tag3',
    likes: 96,
    title: 'First Blog',
    description: `<p>We&rsquo;ve all had those days where everything seems to be going wrong and nothing is as simple as it normally is. Those days where you feel on the verge of throwing your computer out of the window as it crashes again, or can&rsquo;t take another hundred emails clogging up your inbox in one go.</p>
<p>It is easy for stress to mount up when working in an office environment, particularly when we are so dependent on external factors such as functioning IT, or colleagues and contacts keeping up to speed and providing the right information for us to do our own jobs properly.</p>
<p>However, the build up of stress can be hugely detrimental to your efficiency, productivity and general job performance. Even more importantly though, stress can have a huge impact on your health and well-being and can potentially lead to a wide-range of issues if not addressed.</p>
<p>So, aside from giving that worn out stress ball an aggressive squeeze, what can you do to reduce your stress levels in the office the next time you feel the pressure starting to build?</p>
<p><strong>Take control; act rather than react</strong></p>
<p>In the working environment, a familiar trend amongst stress-inducing factors is how keenly it is felt when you feel a situation is out of your control. It could be that you are waiting on someone else to fulfil their side of a bargain, or when your manager is piling on the work.</p>
<p>In these instances, it can feel like there is little you can do to change anything, and it can wear you down. Therefore, it is important to remind yourself that you are not completely powerless and ensure that you have done your side of the work to the best of your abilities.</p>
<p>Try to let go of what is not in your hands; that doesn&rsquo;t need to be your concern anymore.</p>
<p><strong>Cut out the interruptions</strong></p>
<p>When you are under pressure and starting to feel stress mount as you work to deadlines or focus on a difficult task, the last thing you need is a flood of constant interruptions.</p>
<p>Being bombarded with emails, phone calls and other enquiries will only make you feel more frustrated and grind any progress you are making to a halt, so it&rsquo;s time to take action and cut these out at the source.</p>
<p>Start by closing your inbox for an hour and resisting the temptation to constantly check it. This will buy you some time to compose yourself and focus on dealing with the stressful tasks you need to get out of the way. Putting an away-from-desk alert on your email, and taking yourself off phone duties for a short time will also allow you to reduce the stress.</p>
<p><strong>Plan your day in advance</strong></p>
<p>When the workload mounts up, stress can rise. When you don&rsquo;t have a plan to get through the work in an organised fashion, that stress can build up into something huge.</p>
<p>To avoid feeling like you are being pulled in every direction and don&rsquo;t know where to even start, take the time to plan out your day as soon as you get to your desk. Assess what your priorities are and give yourself a generous estimate of how much time you might need.</p>
<p>This will give you a sense of structure and something to follow, whilst maintaining that all-important feeling of being in control. It ought to make your day more manageable and by checking things off as you achieve them and immediately knowing what is up next, you will be able to see the light at the end of the tunnel.</p>
<p>Don&rsquo;t forget to schedule in those breaks and rest periods! Working for seven or eight hours is not productive and will lead to burn out and exhaustion. Taking time in your day to get away from your desk and stretch your legs will increase your overall performance and allow you to focus better in the afternoon.</p>
<p><strong>Watch what you eat</strong></p>
<p>The power of food and rest is incredible, and it simply cannot be ignored when looking to bring stress levels down. In the hustle and the bustle of a busy working day it can tempting to chow down on sugary snacks as a way of battling through, and often it feels like you are too busy to pay attention to a healthy diet.</p>
<p>Getting vitamins in will help your body combat stress, whilst fruit, vegetables and oats can provide your brain with the fuel to push through a long day.</p>
<p>Avoid caffeine and sugar-laden food and drink, as these can wreak havoc on your body and amplify your levels of stress as your energy levels crash.</p>
<p><strong>Motivate yourself and cut some slack</strong></p>
<p>When it comes to your performance, nobody is as harsh a critic as yourself. We all have a habit of beating ourselves up over things, which in turn leads to greater stress.</p>
<p>Instead of worrying, next time remind yourself of the positives you have achieved, and set yourself a goal of completing certain objectives. Encouraging thoughts will reduce stress and put you in a positive frame of mind, ensuring you are ready to deliver to the best of your abilities.</p>`
  },
    {
      id: '2',
      userId: '1',
      createdAt: '2019-02-16T14:26:44.988Z',
      name: 'Muhamamd Omar',
      title: 'First Blog',
      avatar: 'http://lorempixel.com/640/480/nature',
      blogImage: 'http://lorempixel.com/640/480/food', tags: 'tags 1 | tag2 | tag3',
      likes: 100,
      description: 'First post created'
    }
  ];
  comments: Comment[] = [{
    id: '1',
    blogId: '1',
    createdAt: '2019-02-16T21:17:25.567Z',
    comment: 'this article is good',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kimcool/128.jpg',
  }];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const filteredUsers = this.users.filter(user => {
          return user.username === request.body.username && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          const user = filteredUsers[0];
          const body = {
            ...user, token: 'fake-jwt-token'// token can be generated
          };

          return of(new HttpResponse({status: 200, body}));
        } else {
          return throwError({error: {message: 'Username or password is incorrect'}});
        }
      }

      if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
        // check the token
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const urlParts = request.url.split('/');
          const matchedUsers = this.users.filter((user: User) => user.id === urlParts[urlParts.length - 1]);
          const user = matchedUsers.length ? matchedUsers[0] : null;
          return of(new HttpResponse({status: 200, body: user}));
        } else {
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }

      if (request.url.endsWith('/users/register') && request.method === 'POST') {
        const newUser = request.body;
        const duplicateUser = this.users.filter(user => user.username === newUser.username).length;
        if (duplicateUser) {
          return throwError({error: {message: 'Username "' + newUser.username + '" is already exist'}});
        }
        newUser.id = (this.users.length + 1).toString();
        this.users.push(newUser);
        return of(new HttpResponse({status: 200}));
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
          return of(new HttpResponse({status: 200}));
        } else {
          return throwError({status: 401, error: {message: 'Unauthorised'}});
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
            return throwError({error: {message: 'Blog does not exist'}});
          }
          this.bloggers[blogIndex].likes++;
          return of(new HttpResponse({status: 200}));
        } else {
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }

      if (request.url.match(/\/blog\/show\/\d+$/) && request.method === 'GET') {
          const urlParts = request.url.split('/');
          const id = urlParts[urlParts.length - 1];
          const foundIndex = this.bloggers.map(bl => bl.id).indexOf(id);
          if (foundIndex === -1) {
            return throwError({status: 404, error: {message: 'Blog not found'}});
          }
          const blog = this.bloggers[foundIndex];
          blog.comments  = this.comments.filter(comment => comment.blogId === blog.id);
          return of(new HttpResponse({status: 200, body: blog}));
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
          return of(new HttpResponse({status: 200, body: newComment}));
        } else {
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }
      if (request.url.match('/blogs/add') && request.method === 'POST') {
        // check the token
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const newBlog = request.body;
          newBlog.id = (this.bloggers.length + 1).toString();
          newBlog.createdAt = new Date().toDateString();
          this.bloggers.push(newBlog);
          return of(new HttpResponse({status: 200}));
        } else {
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }

      return next.handle(request);
    }));

  }

  constructor() {
  }


}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FackServerService,
  multi: true
};
