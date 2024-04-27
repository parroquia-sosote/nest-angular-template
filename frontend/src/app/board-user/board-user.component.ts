import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './board-user.component.html',
  styleUrl: './board-user.component.scss',
})
export class BoardUserComponent implements OnInit {
  form = {
    email: '',
    password: '',
    username: '',
    fullName: '',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      
  }

  onSubmit() {
    this.authService.signUp(this.form).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
