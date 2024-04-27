import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  getPublicContent(): Observable<string> {
    return of('Public content');
  }

  getAdminBoard(): Observable<string> {
    return of('Admin content');
  }

  updateUserData(data: any): Observable<any> {
    
  }
}
