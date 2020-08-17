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
            ProductActions.loadProductsSuccess({ products: data.result })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private productService: MockProductApiService
  ) {}
}
