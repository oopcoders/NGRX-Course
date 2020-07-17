import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerSupportService } from 'src/app/shared/services/customer-support.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  sendingCustomerSupportMessage,
  clearForm,
} from 'src/app/store/actions/customer-support.actions';
import * as fromSelectors from 'src/app/store/selectors/customer-support.selectors';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  constructor(
    private customerSupportService: CustomerSupportService,
    private store: Store<AppState>
  ) {}

  isSendSuccess: boolean | null = null;

  vm$: Observable<fromSelectors.CustomerSupportViewModel>;

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromSelectors.selectCustomerSupportModel)
    );
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(sendingCustomerSupportMessage({ data: f.value }));
  }

  clearFeedback() {
    this.store.dispatch(clearForm());
  }
}
