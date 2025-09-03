// src/app/components/borrowrecord-form/borrowrecord-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { BorrowRecordService } from '../../services/borrowrecord.service';
import { BorrowRecord } from '../../models/borrowrecord';
import { BookService } from '../../services/book.service';
import { BorrowerService } from '../../services/borrower.service';
import { Book } from '../../models/book';
import { Borrower } from '../../models/borrower';

@Component({
  selector: 'app-borrowrecord-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './borrowrecord-form.component.html',
  styleUrls: ['./borrowrecord-form.component.css']
})
export class BorrowRecordFormComponent implements OnInit {
  borrowRecordForm!: FormGroup;
  isEditMode = false;
  recordId!: number;

  books: Book[] = [];
  borrowers: Borrower[] = [];

  constructor(
    private fb: FormBuilder,
    private borrowRecordService: BorrowRecordService,
    private bookService: BookService,
    private borrowerService: BorrowerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Create form
    this.borrowRecordForm = this.fb.group({
      book: ['', Validators.required],
      borrower: ['', Validators.required],
      borrow_date: ['', Validators.required],
      return_date: ['', Validators.required]
    });

    // ✅ Load dropdown data
    this.bookService.getBooks().subscribe(res => {
      this.books = res.results || res; // works for both paginated and non-paginated
    });

    this.borrowerService.getBorrowers().subscribe(res => {
      this.borrowers = res.results || res;
    });

    // ✅ Check edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.recordId = +id;
        this.loadBorrowRecord(this.recordId);
      }
    });
  }

  // ✅ Load existing record
  loadBorrowRecord(id: number): void {
    this.borrowRecordService.getBorrowRecord(id).subscribe(record => {
      this.borrowRecordForm.patchValue(record);
    });
  }

  // ✅ Submit form
  onSubmit(): void {
    if (this.borrowRecordForm.invalid) {
      return;
    }

    const record: BorrowRecord = this.borrowRecordForm.value;

    if (this.isEditMode) {
      this.borrowRecordService.updateBorrowRecord(this.recordId, record).subscribe(() => {
        alert('Borrow Record updated successfully!');
        this.router.navigate(['/borrowrecords']);
      });
    } else {
      this.borrowRecordService.addBorrowRecord(record).subscribe(() => {
        alert('Borrow Record added successfully!');
        this.router.navigate(['/borrowrecords']);
      });
    }
  }
}

