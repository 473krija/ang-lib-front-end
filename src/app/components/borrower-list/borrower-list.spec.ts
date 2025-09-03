import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerList } from './borrower-list';

describe('BorrowerList', () => {
  let component: BorrowerList;
  let fixture: ComponentFixture<BorrowerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
