import { Component, OnInit } from '@angular/core';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import * as fromProductModels from '../resources/product';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: MockProductApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private paginationService: PaginationService
  ) {}

  products: fromProductModels.Product[] = [];
  pagination: fromProductModels.Pagination;
  currentUrl: string;

  ngOnInit(): void {
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
    this.currentUrl = url;
    this.spinner.show();
    const productsObserver = {
      next: (response) => {
        this.products = response.result;
        this.pagination = response.pagination;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      error: (err) => {
        console.error(err);
        this.alertService.danger('Unable to load products');
        this.spinner.hide();
      },
    };

    this.productService.getProducts(url).subscribe(productsObserver);
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
