import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../resources/product';
import * as fromProductSelectors from '../state/product.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as fromProductActions from '../state/product.actions';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  productId: string;
  isProductInStore$: Observable<boolean>;
  product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.isProductInStore$ = this.store.pipe(
      select(fromProductSelectors.entityExists, { id: this.productId })
    );

    this.product$ = this.isProductInStore$.pipe(
      mergeMap((isProductInStore) => {
        if (!isProductInStore) {
          this.store.dispatch(
            fromProductActions.loadProduct({ id: this.productId })
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
}
