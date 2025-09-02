import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   // ✅ fixed (plural, array)
})
export class AppComponent {
  protected readonly title = signal('library_management-frontend');

  private http = inject(HttpClient);

  data = signal<any | null>(null);

  constructor() {
    // ✅ test backend connection
    this.http.get('http://127.0.0.1:8000/api/books/')
      .subscribe({
        next: (res) => this.data.set(res),
        error: (err) => this.data.set({ error: 'Connection failed', details: err.message })
      });
  }
}

