import { TestBed } from '@angular/core/testing';

import { Borrower } from './borrower';

describe('Borrower', () => {
  let service: Borrower;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Borrower);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
