import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import * as fromAuthActions from '../actions/auth.actions';
import { tap } from 'rxjs/operators';

import * as fromProductActions from '../../modules/products/state/product.actions';

@Injectable()
export class SpinnerEffects {
  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginPage,
          fromAuthActions.loginModal,
          fromProductActions.loadProducts,
          fromProductActions.loadAdminProducts,
          fromProductActions.loadProduct,
          fromProductActions.loadAdminProduct,
          fromProductActions.addProduct
        ),
        tap(() => this.spinner.show())
      ),
    { dispatch: false }
  );

  spinneroff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginSuccess,
          fromAuthActions.loginFailure,
          fromProductActions.loadProductsFailure,
          fromProductActions.loadProductsSuccess,
          fromProductActions.loadProductFailure,
          fromProductActions.loadProductSuccess,
          fromProductActions.addProductSuccess,
          fromProductActions.addProductFailure
        ),
        tap(() => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private spinner: NgxSpinnerService) {}
}
