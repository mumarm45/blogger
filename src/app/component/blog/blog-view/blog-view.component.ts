import {Component, Input, OnInit} from '@angular/core';
import {Blog} from '../../../model/Blog';
import {BlogService} from "../../../service/blog.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  @Input() blog: Blog;
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
  }
  openBlog(id) {
    this.router.navigate([`/blog/show/${id}`]);
  }

}
