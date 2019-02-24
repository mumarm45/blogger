import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AuthenticateService} from "../../service/authenticate.service";
import {BlogService} from "../../service/blog.service";
import {Blog} from "../../model/Blog";
import {User} from "../../model/User";
import {Subscription} from "rxjs/index";
import {BlogViewComponent} from "./blog-view/blog-view.component";

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  blogs: Blog[];
  loggedUser: User;
  loggedUser$: Subscription;
  blogSub$: Subscription;
//  @ViewChild(BlogViewComponent) blogChild: BlogViewComponent;

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
