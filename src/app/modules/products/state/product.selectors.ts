import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as ProductReducer from './product.reducer';
import * as ProductModel from '../resources/product';

export const selectProductsState = createFeatureSelector<ProductReducer.State>(
  ProductReducer.productsFeatureKey
);

export const selectAllProducts = createSelector(
  selectProductsState,
  ProductReducer.selectAll
);

export const selectPagination = createSelector(
  selectProductsState,
  (state: ProductReducer.State) => state.pagination
);

/********************************************************************************* */
/****RETURN PRODUCTS VIEW MODEL */
/********************************************************************************* */

export interface ProductsViewModel {
  pagination: ProductModel.Pagination;
  products: ProductModel.Product[];
}

export const selectProductsViewModel = createSelector(
  selectPagination,
  selectAllProducts,
  (
    pagination: ProductModel.Pagination,
    products: ProductModel.Product[]
  ): ProductsViewModel => {
    return {
      pagination: pagination,
      products: products,
    };
  }
);
