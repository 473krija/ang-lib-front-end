import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },

  // 📚 Book routes
  { path: 'books', component: BookListComponent },
  { path: 'books/add', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent },

  // ✍️ Author routes
  { path: 'authors', component: AuthorListComponent },
  { path: 'authors/add', component: AuthorFormComponent },
  { path: 'authors/edit/:id', component: AuthorFormComponent }
];

