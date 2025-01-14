import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-rest-password',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.scss']
})
export class RestPasswordComponent {
  form: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder, library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.form.valid && this.form.value.password === this.form.value.confirmPassword) {
      // Handle successful form submission
      console.log('Passwords match');
    } else {
      // Handle form errors
      console.log('Passwords do not match');
    }
  }
}