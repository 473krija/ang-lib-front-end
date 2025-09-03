import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BorrowerService } from '../../services/borrower.service';
import { Borrower } from '../../models/borrower';

@Component({
  selector: 'app-borrower-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './borrower-form.component.html',
  styleUrls: ['./borrower-form.component.css']
})
export class BorrowerFormComponent implements OnInit {
  borrowerForm!: FormGroup;
  isEditMode = false;
  borrowerId!: number;

  constructor(
    private fb: FormBuilder,
    private borrowerService: BorrowerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Create form
    this.borrowerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      joined_date: ['', Validators.required]
    });

    // ✅ Check if we are in edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.borrowerId = +id;
        this.loadBorrower(this.borrowerId);
      }
    });
  }

  // ✅ Load existing borrower data when editing
  loadBorrower(id: number): void {
    this.borrowerService.getBorrower(id).subscribe(borrower => {
      this.borrowerForm.patchValue(borrower);
    });
  }

  // ✅ Submit form
  onSubmit(): void {
    if (this.borrowerForm.invalid) {
      return;
    }

    const borrower: Borrower = this.borrowerForm.value;

    if (this.isEditMode) {
      this.borrowerService.updateBorrower(this.borrowerId, borrower).subscribe(() => {
        alert('Borrower updated successfully!');
        this.router.navigate(['/borrowers']);
      });
    } else {
      this.borrowerService.addBorrower(borrower).subscribe(() => {
        alert('Borrower added successfully!');
        this.router.navigate(['/borrowers']);
      });
    }
  }
}

