import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDataService } from '../book-data.service';
import { BookListItem } from '../models';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books$: Observable<BookListItem[]>;
  constructor(private service: BookDataService) { }

  ngOnInit() {
    this.books$ = this.service.getBooks();
  }

}
