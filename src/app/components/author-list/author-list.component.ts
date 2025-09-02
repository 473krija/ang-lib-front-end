import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author, AuthorApiResponse } from '../../models/author';


@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  totalAuthors: number = 0;   // ✅ new
  loading = true;
  error: string | null = null;

  // ✅ Track current page
  currentPage: number = 1;

  // ✅ Pagination info
  pagination: { next: string | null; previous: string | null } = {
    next: null,
    previous: null
  };

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadAuthors(1); // load first page initially
  }

  // ✅ Load authors by page
  loadAuthors(page: number = 1): void {
    this.loading = true;
    this.error = null;

    this.authorService.getAuthors(page).subscribe({
      next: (response: AuthorApiResponse) => {
        this.authors = response.results;       // ✅ author list
        this.totalAuthors = response.count;    // ✅ total count
        this.pagination.next = response.next;
        this.pagination.previous = response.previous;
        this.currentPage = page;
        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Error fetching authors:", err);
        this.error = err?.message || 'Failed to load authors';
        this.loading = false;
      }
    });
  }

  // ✅ Delete author and reload current page
  deleteAuthor(id: number): void {
    if (!confirm('Are you sure you want to delete this author?')) return;

    this.authorService.deleteAuthor(id).subscribe({
      next: () => this.loadAuthors(this.currentPage),
      error: (err) => alert('Delete failed: ' + (err?.message || 'Unknown error'))
    });
  }

  // ✅ Refresh list when a new author is added (from AuthorForm)
  onAuthorAdded(newAuthor: Author): void {
    this.authors.unshift(newAuthor);
    this.totalAuthors += 1;  // ✅ keep count in sync
    this.loadAuthors(1);
  }
}

