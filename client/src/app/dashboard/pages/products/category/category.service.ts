import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8085/api/categories/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  addCategory(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateCategory(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, data);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}