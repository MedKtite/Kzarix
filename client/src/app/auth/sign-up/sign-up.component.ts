import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignUpService } from './sign-up.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService,
    library: FaIconLibrary,
    private router: Router) { 
      this.signUpForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      });
    library.addIconPacks(fas, fab);
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.signUpForm.valid && this.signUpForm.value.password === this.signUpForm.value.confirmPassword) {
      this.signUpService.signUp(this.signUpForm.value).subscribe(
        response => {
          alert('Account created successfully. Please check your email for the verification code.');
          this.router.navigate(['/auth/verify']);
        },
        error => {
          alert('Failed to create account');
        }
      );
    } else {
      alert('Passwords do not match');
    }
  }
}