import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as fromProductActions from '../state/product.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private service: MockProductApiService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
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
    this.store.dispatch(
      fromProductActions.upsertProduct({ product: this.model })
    );
  }
}
