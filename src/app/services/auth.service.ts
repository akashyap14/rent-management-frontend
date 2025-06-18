import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this.loggedIn.asObservable();
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private readonly router: Router) {}

  // 🔐 Email/password login
  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
        this.loggedIn.next(true);
      })
    );
  }

  // 👤 Register (email/password or phone)
  register(data: { username?: string; password?: string; phone?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // 📩 Send OTP to phone
  sendOtp(phone: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-otp`, { phone });
  }

  // ✅ Verify OTP
  verifyOtp(phone: string, otp: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/verify-otp`, { phone, otp }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('phone', phone);
        this.loggedIn.next(true);
      })
    );
  }

  // 🚪 Logout client-side
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('phone');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // ✅ Check if logged in
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🔑 Get stored JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 👤 Get logged-in user
  getCurrentUser(): string | null {
    return localStorage.getItem('username') || localStorage.getItem('phone');
  }
}
