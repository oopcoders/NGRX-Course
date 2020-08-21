import { Component, OnInit } from '@angular/core';
import * as fromProductModels from '../products/resources/product';
import { environment } from 'src/environments/environment';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import * as fromProductActions from './state/product.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as ProductSelector from './state/product.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  vm$: Observable<ProductSelector.ProductsViewModel>;

  constructor(
    private paginationService: PaginationService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(ProductSelector.selectProductsViewModel));
    this.loadProducts(
      this.paginationService.createUrl(
        '0',
        '999',
        '1',
        '9',
        environment.baseUrl + 'products?'
      )
    );
  }

  loadProducts(url: string) {
    this.store.dispatch(
      fromProductActions.loadProducts({
        url: url,
      })
    );
  }

  onPriceFilterChange(item: fromProductModels.PriceFilter) {
    this.loadProducts(
      this.paginationService.createUrl(
        item.min,
        item.max,
        '1',
        '25',
        environment.baseUrl + 'products?'
      )
    );
  }

  onPaginationChange(url: string) {
    this.loadProducts(url);
  }
}
