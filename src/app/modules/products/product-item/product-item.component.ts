import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../resources/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MockProductApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();

    this.product$ = this.service.getProduct(
      this.route.snapshot.paramMap.get('id')
    );

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
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
