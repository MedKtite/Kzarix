import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Product {
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

export class ProductService {
  private readonly baseUrl = 'http://localhost:8085/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/`)
      .pipe(
        tap(products => console.log('Products loaded:', products)),
        catchError(this.handleError)
      );
  }


  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addProduct(formData: FormData): Observable<Product> {
    const productData = this.transformFormData(formData);
    return this.http.post<Product>(`${this.baseUrl}/add`, productData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap(response => console.log('Product added:', response)),
      catchError(this.handleError)
    );
  }

  updateProduct(id: number, formData: FormData): Observable<Product> {
    const productData = this.transformFormData(formData);
    return this.http.put<Product>(`${this.baseUrl}/${id}`, productData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap(response => console.log('Product updated:', response)),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private transformFormData(formData: FormData): Product {
    return {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      quantity: Number(formData.get('quantity')),
      category: {
        id: Number(formData.get('categoryId'))
      }
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.error?.message || 'An error occurred'));
  }
}