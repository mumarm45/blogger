import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCreateRoutingModule } from './blog-create-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BlogCreateComponent } from './blog-create/blog-create.component';

@NgModule({
  declarations: [BlogCreateComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    BlogCreateRoutingModule
  ]
})
export class BlogCreateModule { }
