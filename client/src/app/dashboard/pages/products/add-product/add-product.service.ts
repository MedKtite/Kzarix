import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: {
    id: number;
  };
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private apiUrl = 'http://localhost:8085/api/products/add';

  constructor(private http: HttpClient) {}

  addProduct(formData: FormData): Observable<Product> {
    const productData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      quantity: Number(formData.get('quantity')),
      category: {
        id: Number(formData.get('categoryId'))
      }
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<Product>(this.apiUrl, productData, { headers }).pipe(
      tap(response => console.log('Product added successfully:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Network error occurred'));
    }
    return throwError(() => new Error(`Backend returned code ${error.status}`));
  }
}