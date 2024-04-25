import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form = {
    email: '',
    password: '',
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit() {
    const { email, password } = this.form;

    this.authService.signIn({ email, password }).subscribe({
      next: (response: any) => {
        this.storageService.saveUser(response);
        // this.storageService.saveToken(response.token);
        this.authService.setToken(response.access_token);

        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.isLoginFailed = false;

        this.reloadPage();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
