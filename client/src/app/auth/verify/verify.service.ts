import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private apiUrl = 'http://localhost:8085/auth/verify';

  constructor(private http: HttpClient) {}

  verify(data: { email: string, verificationCode: string }): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred:', error.error.message);
      return throwError(() => new Error(`Client-side error: ${error.error.message}`));
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      return throwError(() => new Error(`Server-side error: ${error.error}`));
    }
  }
}
