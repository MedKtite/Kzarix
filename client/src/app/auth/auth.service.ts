import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>('/auth/login', { email, password })
      .subscribe(response => {
        this.token = response.token;
        localStorage.setItem('authToken', this.token);
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Login failed', error);
      });
  }

  isAuthenticated(): boolean {
    return this.token !== null || localStorage.getItem('authToken') !== null;
  }

  getUserEmail(): string | null {
    const token = this.token || localStorage.getItem('authToken');
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }
}