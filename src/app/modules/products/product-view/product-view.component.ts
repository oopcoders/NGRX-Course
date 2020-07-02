import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { Product } from '../resources/product';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: MockProductApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    const observer = {
      next: (product) => {
        this.product = product;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      error: (err) => {
        this.spinner.hide();
        console.error(err);
      },
    };
    this.productService
      .getProduct(this.route.snapshot.paramMap.get('id'))
      .subscribe(observer);
  }
}
