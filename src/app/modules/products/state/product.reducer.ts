import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductActions from './product.actions';
import { Product, Pagination } from '../resources/product';

export const productsFeatureKey = 'products';

export interface State extends EntityState<Product> {
  // additional entities state properties
  pagination: Pagination;
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  sortComparer: sortByName,
  //selectId: selectProductId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  pagination: null,
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, action) =>
    adapter.setAll(action.paginatedResult.result, {
      ...state,
      pagination: action.paginatedResult.pagination,
    })
  ),
  on(
    ProductActions.loadProductSuccess,
    ProductActions.addProductSuccess,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.upsertProductSuccess, (state, action) =>
    adapter.upsertOne(action.product, state)
  ),
  on(
    ProductActions.deleteProduct,
    ProductActions.deleteItemProduct,
    (state, action) => adapter.removeOne(action.productId, state)
  ),
  on(ProductActions.clearProducts, (state) => adapter.removeAll(state)),
  on(
    ProductActions.upsertProductFailure,
    ProductActions.loadProductsFailure,
    ProductActions.addProductFailure,
    ProductActions.loadProductFailure,
    ProductActions.deleteProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export function sortByName(a: Product, b: Product): number {
  return a.name.localeCompare(b.name);
}

// export function selectProductId(a: Product): string {
//   //In this case this would be optional since primary key is id
//   return a.productid;
// }
