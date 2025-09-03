import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowrecordList } from './borrowrecord-list';

describe('BorrowrecordList', () => {
  let component: BorrowrecordList;
  let fixture: ComponentFixture<BorrowrecordList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowrecordList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowrecordList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
