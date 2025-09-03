import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowrecordForm } from './borrowrecord-form';

describe('BorrowrecordForm', () => {
  let component: BorrowrecordForm;
  let fixture: ComponentFixture<BorrowrecordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowrecordForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowrecordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
