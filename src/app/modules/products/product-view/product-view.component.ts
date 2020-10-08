import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { Product } from '../resources/product';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
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

  constructor(
    private route: ActivatedRoute,
    private productService: MockProductApiService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {}

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

    // this.spinner.show();
    // const observer = {
    //   next: (product) => {
    //     this.product = product;
    //     setTimeout(() => {
    //       this.spinner.hide();
    //     }, 1000);
    //   },
    //   error: (err) => {
    //     this.spinner.hide();
    //     console.error(err);
    //   },
    // };
    // this.productService
    //   .getProduct(this.route.snapshot.paramMap.get('id'))
    //   .subscribe(observer);
  }
}
