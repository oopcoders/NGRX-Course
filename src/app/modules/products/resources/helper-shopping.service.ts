import { Injectable } from '@angular/core';
import { Product } from '../resources/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperShoppingService {
  constructor() {}

  productsSubTotal(products: Product[]): Observable<string> {
    let total: number = 0;
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      total = +element.price + total;
    }
    return of(total.toFixed(2));
  }

  productsTotalItems(products: Product[]): Observable<number> {
    return of(products ? products.length : 0);
  }

  isProductsEmpty(products: Product[]): Observable<boolean> {
    return of(products.length == 0 ? true : false);
  }
}
