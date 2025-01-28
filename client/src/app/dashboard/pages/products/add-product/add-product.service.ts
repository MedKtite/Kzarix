import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private apiUrl = 'http://localhost:8085/api/products/';

  constructor(private http: HttpClient) {}

  addProduct(productData: FormData): Observable<any> {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, productData, { headers });
  }
}