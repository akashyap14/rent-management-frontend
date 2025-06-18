import { Component } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RentDialogComponent } from './components/rent-dialog/rent-dialog.component';
import { CommonModule } from '@angular/common';
import { RentListComponent } from './components/rent-list/rent-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink
  ]
})
export class AppComponent {

  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
  }

  logout(): void {
    this.authService.logout();
  }
}
