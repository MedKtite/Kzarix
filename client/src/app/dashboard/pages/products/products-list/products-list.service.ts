import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProducstListService {
  private apiUrl = 'http://localhost:8085/api/products/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduct(product: any, category: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?category=${category}`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}