import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { BookDataService } from './book-data.service';
import { BookListItem } from './models';

describe('the data service', () => {
  describe('getting some books (happy path)', () => {

    let injector: TestBed;
    let service: BookDataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [BookDataService],
        imports: [HttpClientTestingModule]
      });

      injector = getTestBed();
      service = injector.get(BookDataService);
      httpMock = injector.get(HttpTestingController);
    });

    it('get some books', () => {
      // call the getBooks methon on the service.  (When/Act)

      const booksFromServer: BookListItem[] = [
        { id: '99', title: 'War of the Worlds' },
        { id: '384', title: 'Faust' }
      ];

      let result: BookListItem[];
      service.getBooks().subscribe(books => {
        result = books;
      });
      // Then: there should be a GET request to the proper URL (url, method)
      const req = httpMock.expectOne('http://someserver/books');
      expect(req.request.method).toBe('GET');
      req.flush({ data: booksFromServer });
      // Did it transfrom the data properly { data: BookListItem[] } => BookListItem[]
      expect(result).toEqual(booksFromServer);
    });
  });
});

