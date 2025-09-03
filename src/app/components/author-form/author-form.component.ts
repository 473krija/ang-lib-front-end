import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // ✅ Added
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {
  authorForm!: FormGroup;
  isEditMode = false;
  authorId!: number;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Create form
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      biography: [''], // Optional: only if your Author model has a bio field
      birth_date: ['', Validators.required]
    });

    // ✅ Check if we are in edit mode (if :id exists in the route)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.authorId = +id;
        this.loadAuthor(this.authorId);
      }
    });
  }

  // ✅ Load existing author data when editing
  loadAuthor(id: number): void {
    this.authorService.getAuthor(id).subscribe(author => {
      this.authorForm.patchValue(author);
    });
  }

  // ✅ Submit form
  onSubmit(): void {
    if (this.authorForm.invalid) {
      return;
    }

    const author: Author = this.authorForm.value;

    if (this.isEditMode) {
      this.authorService.updateAuthor(this.authorId, author).subscribe(() => {
        alert('Author updated successfully!');
        this.router.navigate(['/authors']);
      });
    } else {
      this.authorService.addAuthor(author).subscribe(() => {
        alert('Author added successfully!');
        this.router.navigate(['/authors']);
      });
    }
  }
}
