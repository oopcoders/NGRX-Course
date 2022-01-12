import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../resources/product';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import * as fromProductSelectors from '../state/product.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as fromProductActions from '../state/product.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  product$: Observable<Product>;
  isProductInStore$: Observable<boolean>;
  productId: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.isProductInStore$ = this.store.pipe(
      select(fromProductSelectors.entityExists, { id: this.productId })
    );

    this.product$ = this.isProductInStore$.pipe(
      mergeMap((isProductInStore) => {
        if (!isProductInStore) {
          this.store.dispatch(
            fromProductActions.loadAdminProduct({ id: this.productId })
          );
        }

        return this.store.pipe(
          select(fromProductSelectors.selectEntityById, {
            id: this.productId,
          })
        );
      })
    );
  }

  deleteProduct(id: string) {
    this.store.dispatch(
      fromProductActions.deleteItemProduct({ productId: id })
    );
  }
}
