import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getPublicContent(): Observable<string> {
    return of('Public content');
  }

  getAdminBoard(): Observable<string> {
    return of('Admin content');
  }
}
