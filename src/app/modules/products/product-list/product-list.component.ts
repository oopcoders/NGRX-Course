import { Component, OnInit } from '@angular/core';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { AlertService } from 'ngx-alerts';
import * as fromProductModels from '../resources/product';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { environment } from 'src/environments/environment';
import * as fromProductActions from '../state/product.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as ProductSelector from '../state/product.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: MockProductApiService,
    private alertService: AlertService,
    private paginationService: PaginationService,
    private store: Store<AppState>
  ) {}

  currentUrl: string;
  vm$: Observable<ProductSelector.ProductsViewModel>;

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(ProductSelector.selectProductsViewModel));
    this.loadProducts(
      this.paginationService.createUrl(
        '0',
        '999',
        '1',
        '25',
        environment.baseUrl + 'products?'
      )
    );
  }

  loadProducts(url: string) {
    this.store.dispatch(
      fromProductActions.loadAdminProducts({
        url: url,
      })
    );
    this.currentUrl = url;
  }

  deleteProduct(id: number) {
    const productsObserver = {
      next: () => {
        this.loadProducts(this.currentUrl);
        this.alertService.success('Product Deleted');
      },
      error: (err) => {
        console.error(err);
        this.alertService.danger('Unable To Delete Product');
      },
    };
    this.productService.deleteProduct(id).subscribe(productsObserver);
  }

  onPaginationChange(url: string) {
    this.loadProducts(url);
  }
}
