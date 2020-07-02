import { Injectable } from '@angular/core';
import { Product } from './cart';

@Injectable({
  providedIn: 'root',
})
export class HelperCartService {
  constructor() {}

  productsSubTotal(products: Product[]): number {
    let total: number = 0;
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      total = +element.price + total;
    }
    return parseFloat(total.toFixed(2));
  }

  productsTotalItems(products: Product[]): number {
    return products ? products.length : 0;
  }

  isProductsEmpty(products: Product[]): boolean {
    return products.length == 0 ? true : false;
  }
}
