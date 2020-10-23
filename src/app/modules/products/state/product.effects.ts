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

  /****************************************************************** */
  /*****CREATE PRODUCT API EFFECT ** */
  /****************************************************************** */
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) =>
            ProductActions.addProductSuccess({ product: product })
          ),
          catchError((error) =>
            of(ProductActions.addProductFailure({ error: error }))
          )
        )
      )
    )
  );

  /****************************************************************** */
  /*****UPDATE PRODUCT API EFFECT ** */
  /****************************************************************** */
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.upsertProduct),
      mergeMap((action) =>
        this.productService.editProduct(action.product).pipe(
          map((product) => ProductActions.upsertProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.upsertProductFailure({ error }))
          )
        )
      )
    )
  );

  /****************************************************************** */
  /*****DELETE PRODUCT API EFFECT ** */
  /****************************************************************** */
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct, ProductActions.deleteItemProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.productId).pipe(
          map(() => ProductActions.deleteProductSuccess()),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error }))
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
