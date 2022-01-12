import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product, PaginatedResult } from '../resources/product';

/****************************************************************** */
/*****LOAD PRODUCTS ** */
/****************************************************************** */
export const loadProducts = createAction(
  '[Products Component] Load Products',
  props<{ url: string }>()
);

export const loadAdminProducts = createAction(
  '[Products List Component] Load Products',
  props<{ url: string }>()
);

export const loadProductsSuccess = createAction(
  '[Product Effect] Load Products Success',
  props<{ paginatedResult: PaginatedResult<Product[]> }>()
);

export const loadProductsFailure = createAction(
  '[Products Component] Load Products Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****LOAD INDIVIDUAL PRODUCT ** */
/****************************************************************** */

export const loadProduct = createAction(
  '[Product View Component] Load Product',
  props<{ id: string }>()
);

export const loadAdminProduct = createAction(
  '[Product Item Component] Load Product',
  props<{ id: string }>()
);

export const loadProductSuccess = createAction(
  '[Product Effect] Load Product Success',
  props<{ product: Product }>()
);

export const loadProductFailure = createAction(
  '[Product Effect] Load Product Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD INDIVIDUAL PRODUCT ** */
/****************************************************************** */

export const addProduct = createAction(
  '[Product Add Component] Add Product',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[Product Effect] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction(
  '[Product Effect] Add Product Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL PRODUCT ** */
/****************************************************************** */
export const upsertProduct = createAction(
  '[Product Edit Component] Upsert Product',
  props<{ product: Product }>()
);
export const upsertProductSuccess = createAction(
  '[Product Effect] Upsert Product Success',
  props<{ product: Product }>()
);
export const upsertProductFailure = createAction(
  '[Product Effect] Upsert Product failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****DELETE INDIVIDUAL PRODUCT ** */
/****************************************************************** */

export const deleteItemProduct = createAction(
  '[Product Item Component] Delete Product',
  props<{ productId: string }>()
);

export const deleteProduct = createAction(
  '[Product List Component] Delete Product',
  props<{ productId: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product Effect] Delete Product Success'
);
export const deleteProductFailure = createAction(
  '[Product Effect] Delete Product Failure',
  props<{ error: any }>()
);

export const clearProducts = createAction('[Product/API] Clear Products');
