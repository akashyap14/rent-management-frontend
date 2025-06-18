import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isOtpMode = false;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', []],
      password: ['', []],
      phone: ['', []]
    });

    this.setValidators();
  }

  setValidators() {
    if (this.isOtpMode) {
      this.loginForm.get('phone')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]);
      this.loginForm.get('username')?.clearValidators();
      this.loginForm.get('password')?.clearValidators();
    } else {
      this.loginForm.get('username')?.setValidators([Validators.required]);
      this.loginForm.get('password')?.setValidators([Validators.required]);
      this.loginForm.get('phone')?.clearValidators();
    }

    this.loginForm.get('username')?.updateValueAndValidity();
    this.loginForm.get('password')?.updateValueAndValidity();
    this.loginForm.get('phone')?.updateValueAndValidity();
  }

  toggleMode() {
    this.isOtpMode = !this.isOtpMode;
    this.setValidators();
  }

  onSubmit() {
    if (this.isOtpMode) {
      const phone = this.loginForm.get('phone')?.value;
      this.auth.sendOtp(phone).subscribe(() => {
        this.router.navigate(['/verify-otp'], { queryParams: { phone } });
      }, error => {
        this.errorMessage = error.error.message ?? 'Login failed';
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 3000,
          });
      });
    } else {
      const { username, password } = this.loginForm.value;
      this.auth
        .login(username, password)
        .subscribe(() => {
          this.router.navigate(['/rents'])
        }, error => {
          this.errorMessage = error.error.message ?? 'Login failed';
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 3000,
          });
          // Handle login error (e.g., show a message to the user)
        })
    }
  }
}
