import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = 'http://localhost:8085/auth/signup';

  constructor(private http: HttpClient) {}

  signUp(data: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}