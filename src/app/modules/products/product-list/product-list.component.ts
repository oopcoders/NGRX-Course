import { Component, OnInit } from '@angular/core';
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

  deleteProduct(id: string) {
    this.store.dispatch(fromProductActions.deleteProduct({ productId: id }));
  }

  onPaginationChange(url: string) {
    this.loadProducts(url);
  }
}
