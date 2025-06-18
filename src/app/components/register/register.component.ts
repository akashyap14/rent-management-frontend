import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isPhoneMode = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', []],
      password: ['', []],
      phone: ['', []]
    });
    this.setValidators();
  }

  toggleMode() {
    this.isPhoneMode = !this.isPhoneMode;
    this.setValidators();
  }

  setValidators() {
    if (this.isPhoneMode) {
      this.registerForm.get('phone')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]);
      this.registerForm.get('username')?.clearValidators();
      this.registerForm.get('password')?.clearValidators();
    } else {
      this.registerForm.get('username')?.setValidators([Validators.required]);
      this.registerForm.get('password')?.setValidators([Validators.required]);
      this.registerForm.get('phone')?.clearValidators();
    }

    this.registerForm.get('username')?.updateValueAndValidity();
    this.registerForm.get('password')?.updateValueAndValidity();
    this.registerForm.get('phone')?.updateValueAndValidity();
  }

  onSubmit() {
    const { username, password, phone } = this.registerForm.value;
    const data = this.isPhoneMode ? { phone } : { username, password };
    this.auth.register(data).subscribe(() => this.router.navigate(['/login']));
  }
}
