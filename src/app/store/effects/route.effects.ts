import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromProductActions from '../../modules/products/state/product.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class RouteEffects {
  goShopping$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap(() => this.route.navigate(['/shopping/products']))
      ),
    { dispatch: false }
  );

  gohome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.route.navigate(['/home']))
      ),
    { dispatch: false }
  );

  goProductList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.upsertProductSuccess,
          fromProductActions.deleteItemProduct
        ),
        tap(() => this.route.navigate(['/shopping/product-list']))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private route: Router) {}
}
