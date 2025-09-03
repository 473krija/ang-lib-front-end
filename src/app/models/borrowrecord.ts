// src/app/models/borrowrecord.ts
export interface BorrowRecord {
  id?: number;
  book: number;       // Foreign key -> Book ID
  borrower: number;   // Foreign key -> Borrower ID
  borrow_date: string;
  return_date: string;
}

export interface BorrowRecordApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BorrowRecord[];
}