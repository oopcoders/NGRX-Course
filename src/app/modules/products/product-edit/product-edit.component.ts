import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private service: MockProductApiService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {}

  model: any = {};

  ngOnInit() {
    this.spinner.show();
    this.service
      .getProduct(this.route.snapshot.paramMap.get('id'))
      .subscribe((product) => (this.model = product));
    //Remove setTimeout in production
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  onSubmit() {
    this.spinner.show();
    const productObserver = {
      next: (product) => {
        this.router.navigate(['/shopping/product-list']),
          console.log('success');

        setTimeout(() => {
          this.spinner.hide();
          this.alertService.success('Product Edited');
        }, 1000);
      },
      error: (err) => {
        console.error(err);
        this.alertService.danger('Unable to edit product');
        this.spinner.hide();
      },
    };

    this.service.editProduct(this.model).subscribe(productObserver);
  }
}
