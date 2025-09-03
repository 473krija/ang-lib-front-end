import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BorrowerListComponent } from './components/borrower-list/borrower-list.component';
import {BorrowerFormComponent} from './components/borrower-form/borrower-form.component';
import {BorrowRecordListComponent} from './components/borrowrecord-list/borrowrecord-list.component';
import { BorrowRecordFormComponent } from './components/borrowrecord-form/borrowrecord-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },

  // 📚 Book routes
  { path: 'books', component: BookListComponent },
  { path: 'books/add', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent },

  // ✍️ Author routes
  { path: 'authors', component: AuthorListComponent },
  { path: 'authors/add', component: AuthorFormComponent },
  { path: 'authors/edit/:id', component: AuthorFormComponent },

  // ✍️ Borrower routes
  { path: 'borrowers', component: BorrowerListComponent },
  { path: 'borrowers/add', component: BorrowerFormComponent },
  { path: 'borrowers/edit/:id', component: BorrowerFormComponent},

  // Borrowrecord routes
  { path: 'borrowrecords', component: BorrowRecordListComponent },
  { path: 'borrowrecords/add', component: BorrowRecordFormComponent},
  { path: 'borrowrecords/edit/:id', component: BorrowRecordFormComponent},

];

