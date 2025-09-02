import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Author } from '../../models/author';

// 👉 Import required Angular modules
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  book: Book = { title: '', author: 0, published_date: '', genre: '', available_copies: 10 }; // author → number (ID)
  isEdit = false;
  authors: Author[] = []; // store list of authors for dropdown

  // 👉 Event emitter to tell parent (BookList) that a new book was added
  @Output() bookAdded = new EventEmitter<Book>();

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // ✅ Load authors for dropdown
    this.authorService.getAuthors().subscribe((response) => {
      this.authors = response.results;
    });

    // ✅ If editing book
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bookService.getBook(+id).subscribe(data => (this.book = data));
    }
  }

  saveBook() {
    if (this.isEdit) {
      this.bookService.updateBook(this.book.id!, this.book).subscribe(() => {
        alert('✅ Book updated successfully!');
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(this.book).subscribe({
        next: (createdBook) => {
          alert('✅ Book added successfully!');
          this.bookAdded.emit(createdBook); // notify parent list
          this.router.navigate(['/books']); // redirect back to list
        },
        error: (err) => {
          alert('❌ Add failed: ' + JSON.stringify(err.error)); // show backend validation errors
        }
      });
    }
  }
}
