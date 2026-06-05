import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/student/login`, { email, password });
  }
  adminLogin(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/admin/login`, { username, password });
  }

  createAccount(email: string, password: string, name: string) {
    return this.http.post<any>(`${this.baseUrl}/student/signup`, { email, password, name });
  }
}
