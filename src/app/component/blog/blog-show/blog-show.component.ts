import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../service/blog.service';
import {ActivatedRoute} from '@angular/router';
import {Blog} from '../../../model/Blog';

@Component({
  selector: 'app-blog-show',
  templateUrl: './blog-show.component.html',
  styleUrls: ['./blog-show.component.css']
})
export class BlogShowComponent implements OnInit {

  id: string;
  blog: Blog;

  constructor(private blogService: BlogService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    this.blogService.getOneBlog(this.id).subscribe((result: Blog) => {
      this.blog = result;
    });
  }

  likeBlog(id) {
    this.blogService.likePost(id).subscribe(res => {});
  }

}
