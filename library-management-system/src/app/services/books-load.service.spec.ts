import { TestBed } from '@angular/core/testing';

import { BooksLoadService } from './books-load.service';

describe('BooksLoadService', () => {
  let service: BooksLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
