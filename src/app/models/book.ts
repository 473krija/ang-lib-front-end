export interface Book {
  id?: number;           // optional because Django might auto-generate it
  title: string;         // book title
  author: number;        // author name
  published_date: string; // you can also use Date if you want strict date type
  genre: string;
  available_copies: number;
}

export interface BookApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

