// src/app/components/borrowrecord-list/borrowrecord-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BorrowRecordService } from '../../services/borrowrecord.service';
import { BorrowRecord, BorrowRecordApiResponse } from '../../models/borrowrecord';

@Component({
  selector: 'app-borrowrecord-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './borrowrecord-list.component.html',
  styleUrls: ['./borrowrecord-list.component.css']
})
export class BorrowRecordListComponent implements OnInit {
  borrowRecords: BorrowRecord[] = [];
  totalRecords: number = 0;
  loading = true;
  error: string | null = null;

  currentPage: number = 1;
  pagination: { next: string | null; previous: string | null } = {
    next: null,
    previous: null
  };

  constructor(private borrowRecordService: BorrowRecordService) {}

  ngOnInit(): void {
    this.loadBorrowRecords(1);
  }

  loadBorrowRecords(page: number = 1): void {
    this.loading = true;
    this.error = null;

    this.borrowRecordService.getBorrowRecords(page).subscribe({
      next: (response: BorrowRecordApiResponse) => {
        this.borrowRecords = response.results;
        this.totalRecords = response.count;
        this.pagination.next = response.next;
        this.pagination.previous = response.previous;
        this.currentPage = page;
        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Error fetching borrow records:", err);
        this.error = err?.message || 'Failed to load borrow records';
        this.loading = false;
      }
    });
  }

  deleteBorrowRecord(id: number): void {
    if (!confirm('Are you sure you want to delete this borrow record?')) return;

    this.borrowRecordService.deleteBorrowRecord(id).subscribe({
      next: () => this.loadBorrowRecords(this.currentPage),
      error: (err) => alert('Delete failed: ' + (err?.message || 'Unknown error'))
    });
  }
}

