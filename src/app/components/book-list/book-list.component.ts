import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book, BookApiResponse } from '../../models/book';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BookFormComponent], // ✅ import BookFormComponent
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  error: string | null = null;

  // ✅ Track current page
  currentPage: number = 1;

  // ✅ Pagination info
  pagination: { next: string | null; previous: string | null } = {
    next: null,
    previous: null
  };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks(1); // load first page initially
  }

  // ✅ Load books by page
  loadBooks(page: number = 1): void {
    this.loading = true;
    this.error = null;

    this.bookService.getBooks(page).subscribe({
      next: (data: BookApiResponse) => {
        this.books = data.results;
        this.pagination.next = data.next;
        this.pagination.previous = data.previous;
        this.currentPage = page;
        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Error fetching books:", err);
        this.error = err?.message || 'Failed to load books';
        this.loading = false;
      }
    });
  }

  // ✅ Delete book and reload current page
  deleteBook(id: number): void {
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => this.loadBooks(this.currentPage),
      error: (err) => alert('Delete failed: ' + (err?.message || 'Unknown error'))
    });
  }

  // ✅ Refresh list when a new book is added (from BookForm)
  onBookAdded(newBook: Book): void {
    // Push directly so user sees it immediately
    this.books.unshift(newBook);

    // Reload first page to keep pagination consistent
    this.loadBooks(1);
  }
}




