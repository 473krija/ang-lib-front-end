// src/app/services/author.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Author, AuthorApiResponse } from '../models/author';



@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = 'http://127.0.0.1:8000/api/authors/';  // Django backend API endpoint

  constructor(private http: HttpClient) {}

  // ✅ Get all authors
  getAuthors(page: number = 1): Observable<AuthorApiResponse> {
    return this.http.get<AuthorApiResponse>(`${this.apiUrl}?page=${page}`);
    
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}${id}/`);
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

  updateAuthor(id: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}${id}/`, author);
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
