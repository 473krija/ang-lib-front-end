export interface Borrower {
    id?: number;
    name: string;
    email: string;
    joined_date: number;
}

export interface BorrowerApiResponse {
    count: number;
  next: string | null;
  previous: string | null;
  results: Borrower[]
}