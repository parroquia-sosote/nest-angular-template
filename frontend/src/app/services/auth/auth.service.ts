import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000/api/v1'; // replace with your API URL

  constructor(private http: HttpClient) {}

  signUp(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/signup`, credentials);
  }

  signIn(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/signin`, credentials);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }
}
