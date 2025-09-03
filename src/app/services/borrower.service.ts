// src/app/services/borrower.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrower, BorrowerApiResponse } from '../models/borrower';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {

  private apiUrl = 'http://127.0.0.1:8000/api/borrowers/';  // Django backend API endpoint

  constructor(private http: HttpClient) {}

  // ✅ Get all borrowers (with pagination support)
  getBorrowers(page: number = 1): Observable<BorrowerApiResponse> {
    return this.http.get<BorrowerApiResponse>(`${this.apiUrl}?page=${page}`);
  }

  // ✅ Get single borrower by ID
  getBorrower(id: number): Observable<Borrower> {
    return this.http.get<Borrower>(`${this.apiUrl}${id}/`);
  }

  // ✅ Add new borrower
  addBorrower(borrower: Borrower): Observable<Borrower> {
    return this.http.post<Borrower>(this.apiUrl, borrower);
  }

  // ✅ Update existing borrower
  updateBorrower(id: number, borrower: Borrower): Observable<Borrower> {
    return this.http.put<Borrower>(`${this.apiUrl}${id}/`, borrower);
  }

  // ✅ Delete borrower
  deleteBorrower(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
