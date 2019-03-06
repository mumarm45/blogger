import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthenticateService} from '../../service/authenticate.service';
import {BlogService} from '../../service/blog.service';
import {Blog} from '../../model/Blog';
import {User} from '../../model/User';
import {Subscription} from 'rxjs/index';
import {BlogViewComponent} from './blog-view/blog-view.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: Blog[];
  loggedUser: User;
  loggedUser$: Subscription;
  blogSub$: Subscription;

  constructor(private authenticateService: AuthenticateService, private blogService: BlogService) {

  }

  ngOnInit() {
    this.blogSub$ = this.blogService.getBlogs().subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
    });
    this.loggedUser$ = this.authenticateService.loginUser.subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    });
  }

  logout(event) {
    event.stopPropagation();
    this.authenticateService.logout();
  }

  addComment(blog, event) {
    if (!event.target.value) {
      return;
    }
    if (!blog.comments) {
      blog.comments = [];
    }
    const comment = {comment: event.target.value, blogId: blog.id};
    this.blogService.addComments(comment).subscribe(newComment => {
      blog.comments.push(newComment);
      event.target.value = '';
    });
  }


  ngOnDestroy() {
    this.loggedUser$.unsubscribe();
    this.blogSub$.unsubscribe();
  }
}
