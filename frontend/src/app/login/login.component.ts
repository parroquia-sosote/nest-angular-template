import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
        // TODO: change backend to return user object apart from token
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
