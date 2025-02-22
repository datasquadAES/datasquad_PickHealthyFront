import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



    private readonly validEmail = 'admon@yummi.com';
    private readonly validPassword = 'yummi123';

    private isAuthenticated = false;

    constructor(private router: Router) {}

    login(email: string, password: string): boolean {
      if (email === this.validEmail && password === this.validPassword) {
        this.isAuthenticated = true;
        this.router.navigate(['/dashboard']);
        return true;
      } else {
        this.isAuthenticated = false;
        return false;
      }
    }

    logout(): void {
      this.isAuthenticated = false;
      this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
      return this.isAuthenticated;
    }

    register(email: string, password: string): boolean {
      // In a real application, this would typically involve an API call
      // For this example, we'll just simulate registration
      if (email && password && email.includes('@')) {
        // Basic validation
        console.log('User registered:', email);
        return true;
      }
      return false;
    }
}
