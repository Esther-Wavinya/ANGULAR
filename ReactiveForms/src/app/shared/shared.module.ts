import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NgbTypeahead
  ]
})
export class SharedModule { }
