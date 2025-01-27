import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.scss']
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
        (response: any) => {
          if (response.message === "Admin account created. Please wait for approval.") {
            alert(response.message);
            this.router.navigate(['/auth/verify']);
          } else {
            alert('Failed to create admin account: ' + response.message);
          }
        },
        (error: any) => {
          alert('Failed to create admin account: ' + (error.error?.error || 'Unknown error'));
        }
      );
    } else {
      alert('Passwords do not match');
    }
  }
}