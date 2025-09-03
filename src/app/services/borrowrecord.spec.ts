import { TestBed } from '@angular/core/testing';

import { Borrowrecord } from './borrowrecord';

describe('Borrowrecord', () => {
  let service: Borrowrecord;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Borrowrecord);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
