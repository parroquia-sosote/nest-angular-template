import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const USER_KEY = 'user';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  clean(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
  }

  public saveUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(USER_KEY);
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }

    return {};
  }

  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem(USER_KEY);
      if (user) {
        return true;
      }
    }

    return false;
  }
}
