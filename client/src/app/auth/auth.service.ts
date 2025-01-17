import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isAuthenticated(): boolean {
    // Implement your logic to check if the user is authenticated
    // For example, check if a token exists in local storage
    return !!localStorage.getItem('authToken');
  }
}