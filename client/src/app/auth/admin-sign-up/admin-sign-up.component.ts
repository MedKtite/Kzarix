import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-sign-up',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, RouterModule, ],
  templateUrl: './admin-sign-up.component.html',
  styleUrl: './admin-sign-up.component.scss'
})
export class AdminSignUpComponent {
  signUpForm: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.signUpForm.valid && this.signUpForm.value.password === this.signUpForm.value.confirmPassword) {
      const adminData = {
        ...this.signUpForm.value,
        role: 'ADMIN'
      };
      this.http.post('http://localhost:8085/auth/admin-signup', adminData).subscribe(
        response => {
          alert('Admin account created successfully. Please check your email for the verification code.');
          this.router.navigate(['/auth/verify']);
        },
        error => {
          alert('Failed to create admin account');
        }
      );
    } else {
      alert('Passwords do not match');
    }
  }

}
