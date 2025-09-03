// src/app/components/borrower-list/borrower-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BorrowerService } from '../../services/borrower.service';
import { Borrower, BorrowerApiResponse } from '../../models/borrower';

@Component({
  selector: 'app-borrower-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './borrower-list.component.html',
  styleUrls: ['./borrower-list.component.css']
})
export class BorrowerListComponent implements OnInit {
  borrowers: Borrower[] = [];
  totalBorrowers: number = 0;   // ✅ total count for pagination
  loading = true;
  error: string | null = null;

  // ✅ Track current page
  currentPage: number = 1;

  // ✅ Pagination info
  pagination: { next: string | null; previous: string | null } = {
    next: null,
    previous: null
  };

  constructor(private borrowerService: BorrowerService) {}

  ngOnInit(): void {
    this.loadBorrowers(1); // Load first page initially
  }

  // ✅ Load borrowers by page
  loadBorrowers(page: number = 1): void {
    this.loading = true;
    this.error = null;

    this.borrowerService.getBorrowers(page).subscribe({
      next: (response: BorrowerApiResponse) => {
        this.borrowers = response.results;         // ✅ borrower list
        this.totalBorrowers = response.count;      // ✅ total count
        this.pagination.next = response.next;
        this.pagination.previous = response.previous;
        this.currentPage = page;
        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Error fetching borrowers:", err);
        this.error = err?.message || 'Failed to load borrowers';
        this.loading = false;
      }
    });
  }

  // ✅ Delete borrower and reload current page
  deleteBorrower(id: number): void {
    if (!confirm('Are you sure you want to delete this borrower?')) return;

    this.borrowerService.deleteBorrower(id).subscribe({
      next: () => this.loadBorrowers(this.currentPage),
      error: (err) => alert('Delete failed: ' + (err?.message || 'Unknown error'))
    });
  }

  // ✅ Refresh list when a new borrower is added (from BorrowerForm)
  onBorrowerAdded(newBorrower: Borrower): void {
    this.borrowers.unshift(newBorrower);
    this.totalBorrowers += 1;  // ✅ keep count in sync
    this.loadBorrowers(1);
  }
}

