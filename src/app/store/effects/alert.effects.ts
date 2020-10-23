import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertService } from 'ngx-alerts';
import * as fromAuthActions from '../actions/auth.actions';
import { tap } from 'rxjs/operators';
import * as fromProductActions from '../../modules/products/state/product.actions';

@Injectable()
export class AlertEffects {
  checkingYourInformation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginPage, fromAuthActions.loginModal),
        tap(() => this.alertService.info('Checking your information'))
      ),
    { dispatch: false }
  );

  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap((action) =>
          this.alertService.success(
            'Welcome Back ' + action.user.username + ' !'
          )
        )
      ),
    { dispatch: false }
  );

  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginFailure),
        tap(() => this.alertService.danger('Unable to login'))
      ),
    { dispatch: false }
  );

  youAreLoggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.alertService.warning('You are logged out'))
      ),
    { dispatch: false }
  );
  comeBackSoon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() =>
          setTimeout(() => {
            this.alertService.info('Come Back Soon!');
          }, 2000)
        )
      ),
    { dispatch: false }
  );

  unableToLoadProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.loadProductsFailure),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger('Unable to load products');
          }, 2000)
        )
      ),
    { dispatch: false }
  );

  productCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.addProductSuccess),
        tap((action) => this.alertService.success('Product Created'))
      ),
    { dispatch: false }
  );

  unableToCreateProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.addProductFailure),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger('Unable to create product');
          }, 2000)
        )
      ),
    { dispatch: false }
  );

  productUpsertSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.upsertProductSuccess),
        tap(() =>
          setTimeout(() => {
            this.alertService.info('Product Updated');
          }, 1000)
        )
      ),
    { dispatch: false }
  );
  unableToEditProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.upsertProductFailure),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger('Unable to edit product');
          }, 1000)
        )
      ),
    { dispatch: false }
  );

  removeProductFromStore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.deleteProduct,
          fromProductActions.deleteItemProduct
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.warning('Remove Product From Store');
          }, 1000)
        )
      ),
    { dispatch: false }
  );
  productDeleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.deleteProductSuccess),
        tap(() =>
          setTimeout(() => {
            this.alertService.info('Product removed from Database');
          }, 1000)
        )
      ),
    { dispatch: false }
  );
  unableToDeleteProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.deleteProductFailure),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger('Unable to delete product');
          }, 1000)
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private alertService: AlertService) {}
}
