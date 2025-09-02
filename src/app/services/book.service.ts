import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookApiResponse } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksApiUrl = 'http://127.0.0.1:8000/api/books/';   // Books endpoint
  private authorsApiUrl = 'http://127.0.0.1:8000/api/authors/'; // Authors endpoint

  constructor(private http: HttpClient) {}

  // ✅ Get all books (supports both page number or full URL)
  getBooks(pageOrUrl: number | string = 1): Observable<BookApiResponse> {
    let url: string;
    if (typeof pageOrUrl === 'number') {
      url = `${this.booksApiUrl}?page=${pageOrUrl}`;
    } else {
      url = pageOrUrl;
    }
    return this.http.get<BookApiResponse>(url);
  }

  // ✅ Get single book
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksApiUrl}${id}/`);
  }

  // ✅ Create book
  addBook(book: Book): Observable<Book> {
    const payload = {
      title: book.title,
      author: book.author,  // will be author ID if dropdown is used
      genre: book.genre || '',
      published_date: book.published_date ? book.published_date : null,
      available_copies: book.available_copies ?? 0
    };
    return this.http.post<Book>(this.booksApiUrl, payload);
  }

  // ✅ Update book
  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.booksApiUrl}${id}/`, book);
  }

  // ✅ Delete book
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.booksApiUrl}${id}/`);
  }

  
}

