
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VerifyService } from './verify.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  verifyForm: FormGroup;
  isPasswordVisible = false;
  isVerified = false;

  constructor(
    private fb: FormBuilder,
    private verifyService: VerifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.verifyForm.patchValue({
        email: params['email'],
        verificationCode: params['code']
      });
    });
  }

onSubmit() {
  if (this.verifyForm.valid) {
    const formData = this.verifyForm.value;
    console.log('Form Data:', formData);
    this.verifyService.verify(formData).pipe(
      tap(response => {
        console.log('Response:', response);
        alert('Account verified successfully');
        this.isVerified = true;
      }),
      catchError(error => {
        console.error('Error:', error);
        alert('Verification failed: ' + error.message);
        return of(null);
      })
    ).subscribe();
  }
}
navigateToLogin() {
  this.router.navigate(['/auth/login']);
}
}
