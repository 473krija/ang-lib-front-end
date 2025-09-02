export interface Author {
    id?: number;
    name: string;
    birth_date: string;
    biography: string;
}

export interface AuthorApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Author[];
}