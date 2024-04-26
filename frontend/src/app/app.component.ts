import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
