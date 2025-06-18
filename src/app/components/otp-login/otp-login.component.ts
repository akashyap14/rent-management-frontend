import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-otp-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './otp-login.component.html',
  styleUrl: './otp-login.component.scss'
})
export class OtpLoginComponent {
  otpForm!: FormGroup;
  phone: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]]
    });
    this.route.queryParams.subscribe(params => this.phone = params['phone']);
  }

  onSubmit() {
    const otp = this.otpForm.get('otp')?.value;
    this.auth.verifyOtp(this.phone, otp).subscribe(() => this.router.navigate(['/rents']));
  }
}
