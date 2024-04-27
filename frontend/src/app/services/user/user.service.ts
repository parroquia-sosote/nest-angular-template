import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<string> {
    return of('Public content');
  }

  getAdminBoard(): Observable<string> {
    return of('Admin content');
  }

  updateUserData(data: any, userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/${userId}`, data);
  }
}
