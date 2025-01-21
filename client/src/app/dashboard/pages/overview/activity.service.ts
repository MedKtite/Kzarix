import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = '/api/activities';

  constructor(private http: HttpClient) {}

  getActivities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}