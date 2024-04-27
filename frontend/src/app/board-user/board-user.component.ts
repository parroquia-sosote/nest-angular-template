import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage/storage.service';

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

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // get logged in user
    const user = this.storageService.getUser();
    // put it in the form
    this.form = {
      email: user.email,
      password: user.password,
      username: user.username,
      fullName: user.fullName,
    };
  }

  updateUserData() {
    console.log('updateUserData', this.form);
    
    // this.authService.signUp(this.form).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   error: (error) => {
    //     console.error(error);
    //     this.errorMessage = error.error.message;
    //     this.isSignUpFailed = true;
    //   },
    // });
  }
}
