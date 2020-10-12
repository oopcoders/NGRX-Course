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
  on(ProductActions.loadProductsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(
    ProductActions.loadProductSuccess,
    ProductActions.addProductSuccess,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.loadProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.addProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.upsertProduct, (state, action) =>
    adapter.upsertOne(action.product, state)
  ),
  on(ProductActions.addProducts, (state, action) =>
    adapter.addMany(action.products, state)
  ),
  on(ProductActions.upsertProducts, (state, action) =>
    adapter.upsertMany(action.products, state)
  ),
  on(ProductActions.updateProduct, (state, action) =>
    adapter.updateOne(action.product, state)
  ),
  on(ProductActions.updateProducts, (state, action) =>
    adapter.updateMany(action.products, state)
  ),
  on(ProductActions.deleteProduct, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ProductActions.deleteProducts, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(ProductActions.clearProducts, (state) => adapter.removeAll(state))
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
