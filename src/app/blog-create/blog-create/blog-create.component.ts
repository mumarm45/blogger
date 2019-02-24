import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BlogService} from '../../service/blog.service';


@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  submitted = false;
  formData = {description: '', tags: '', blogImage: 'http://lorempixel.com/400/200/'};

  constructor(private router: Router, private blogService: BlogService) { }

  ngOnInit() {
  }


  onSubmit() {
    this.submitted = true;
    if (!this.formData.description) {
      return;
    }
    this.blogService.createBlog(this.formData).subscribe(blog => {
      this.router.navigate(['/blog']);
    });

  }

}
