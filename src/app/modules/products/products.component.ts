import { Component, OnInit } from '@angular/core';
import { MockProductApiService } from './resources/mock-product-api.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/resources/auth.service';
import { User } from '../auth/resources/auth';
import * as fromProductModels from '../products/resources/product';
import { environment } from 'src/environments/environment';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { Pagination } from 'src/app/shared/models/pagination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: fromProductModels.Product[] = [];
  pagination: Pagination;
  user: User;

  constructor(
    private productService: MockProductApiService,
    public router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
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
