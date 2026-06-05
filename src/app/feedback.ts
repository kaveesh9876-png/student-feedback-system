import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  baseUrl = 'http://localhost:8080/api/feedback';

  constructor(private http: HttpClient) { }

  submitFeedback(data: any) {
    return this.http.post(`${this.baseUrl}/submit`, data, this.getAuthHeaders());
  }

  getCourses() {
    return this.http.get('http://localhost:8080/api/courses', this.getAuthHeaders());
  }

  getAllFeedback(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, this.getAuthHeaders());
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}