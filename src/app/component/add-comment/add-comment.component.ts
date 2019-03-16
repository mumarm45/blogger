import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BlogService} from '../../service/blog.service';
import {AuthenticateService} from '../../service/authenticate.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() blog;
  comment = new FormControl('');
  constructor(private blogService: BlogService) { }
  ngOnInit() {}
  addComment() {
    const comment = {comment: this.comment.value, blogId: this.blog.id};
    this.blogService.addComments(comment).subscribe(newComment => {
      this.blog.comments.push(newComment);
      this.comment.setValue('');
    });
  }
}
