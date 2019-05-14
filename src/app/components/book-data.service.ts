import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookListItem } from './models';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<BookListItem[]> {
    return this.http.get<BooksGetResponse>('http://someserve/books')
      .pipe(
        map(r => r.data)
      );
    // return of([
    //   { id: '1', title: 'Walden' },
    //   { id: '2', title: 'Nature' }
    // ]);
  }
}

interface BooksGetResponse {
  data: BookListItem[];
}
