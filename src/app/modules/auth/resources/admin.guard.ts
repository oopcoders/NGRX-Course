import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppState } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  isAdmin: boolean;
  canActivate(): boolean {
    this.store.pipe(select(selectIsAdmin)).subscribe((bool) => {
      this.isAdmin = bool;
      if (!this.isAdmin) {
        this.router.navigate(['/home']);
      }
    });

    return this.isAdmin;
  }
}
