import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {Blog} from '../model/Blog';
import {Comment} from '../model/Comment';
import {forkJoin} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';
import {AuthenticateService} from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient,  private autheticService: AuthenticateService) {
  }

  getAllBlogs() {
    return this.http.get<Blog[]>(`${environment.apiUrl}/blogs`);
  }

  getAllComments() {
    return this.http.get<Comment[]>(`${environment.apiUrl}/comments`);
  }
  likePost(id) {
    return this.http.put(`${environment.apiUrl}/blogs/like`, { blogId: id});
  }
  getBlogs() {
    return forkJoin(this.getAllBlogs(), this.getAllComments()).pipe(map(
      ([blogs, comments]) => {
        return blogs.map(blog => {
          blog.comments = comments.filter(comment => comment.blogId === blog.id);
          return blog;
        });
      }
    ));
  }

  createBlog(blog) {
    const request = {
      ...blog,
      userId: this.autheticService.loginUserValue.id,
      name: this.autheticService.loginUserValue.username,
      avatar: this.autheticService.loginUserValue.avatar,
      likes: 0
    };
    return this.http.post(`${environment.apiUrl}/blogs/add`, request);
  }

  addComments(comment: Comment) {
    return this.http.post(`${environment.apiUrl}/comments/add`, comment);
  }

  update(user: User) {
    return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  }
}
