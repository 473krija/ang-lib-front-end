// src/app/services/borrowrecord.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BorrowRecord, BorrowRecordApiResponse } from '../models/borrowrecord';

@Injectable({
  providedIn: 'root'
})
export class BorrowRecordService {
  private apiUrl = 'http://127.0.0.1:8000/api/borrowrecords/';

  constructor(private http: HttpClient) {}

  getBorrowRecords(page: number = 1): Observable<BorrowRecordApiResponse> {
    return this.http.get<BorrowRecordApiResponse>(`${this.apiUrl}?page=${page}`);
  }

  getBorrowRecord(id: number): Observable<BorrowRecord> {
    return this.http.get<BorrowRecord>(`${this.apiUrl}${id}/`);
  }

  addBorrowRecord(record: BorrowRecord): Observable<BorrowRecord> {
    return this.http.post<BorrowRecord>(this.apiUrl, record);
  }

  updateBorrowRecord(id: number, record: BorrowRecord): Observable<BorrowRecord> {
    return this.http.put<BorrowRecord>(`${this.apiUrl}${id}/`, record);
  }

  deleteBorrowRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
