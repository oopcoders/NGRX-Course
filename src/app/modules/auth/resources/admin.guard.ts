import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  isAdmin: boolean;
  canActivate(): boolean {
    this.authService.user.subscribe((user) => {
      this.isAdmin = user.isadmin;
      if (!this.isAdmin) {
        this.router.navigate(['/home']);
      }
    });

    return this.isAdmin;
  }
}
