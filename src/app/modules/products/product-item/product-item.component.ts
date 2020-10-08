import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../resources/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MockProductApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {}

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
    // this.spinner.show();

    // this.product$ = this.service.getProduct(
    //   this.route.snapshot.paramMap.get('id')
    // );

    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1000);
  }

  deleteProduct(id: number) {
    this.spinner.show();
    const productsObserver = {
      next: () => {
        setTimeout(() => {
          this.spinner.hide();
          this.alertService.success('Product Deleted');
        }, 1000);
        console.log('Product Deleted');
        this.router.navigate(['/shopping/product-list']);
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
        this.alertService.success('Unable To Delete Product');
      },
    };
    this.service.deleteProduct(id).subscribe(productsObserver);
  }
}
