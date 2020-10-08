import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MockProductApiService } from '../resources/mock-product-api.service';
import * as ProductActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  /****************************************************************** */
  /*****LOAD PRODUCTS API EFFECT ** */
  /****************************************************************** */
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts, ProductActions.loadAdminProducts),
      mergeMap((action) =>
        this.productService.getProducts(action.url).pipe(
          map((data) =>
            ProductActions.loadProductsSuccess({ paginatedResult: data })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  /****************************************************************** */
  /*****LOAD PRODUCT API EFFECT ** */
  /****************************************************************** */

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct, ProductActions.loadAdminProduct),
      mergeMap((action) =>
        this.productService.getProduct(action.id).pipe(
          map((product) =>
            ProductActions.loadProductSuccess({ product: product })
          ),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error: error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: MockProductApiService
  ) {}
}
