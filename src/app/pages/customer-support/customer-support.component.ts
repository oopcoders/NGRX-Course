import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerSupportService } from 'src/app/shared/services/customer-support.service';
import * as FromCustomerActions from '../../store/actions/customer-support.actions';
import { AppState } from './../../store/index';
// tslint:disable-next-line: import-spacing
import * as CustomerSelectors from '../../store/selectors/customer-support.selectors';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  constructor(
    private store: Store<AppState>
  ) { }

  isSendSuccess: boolean | null = null;

  cusData$: Observable<CustomerSelectors.CusSupportData>;

  ngOnInit(): void {
    this.cusData$ = this.store.pipe(select(CustomerSelectors.customerSupportData));
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(FromCustomerActions.sendCustomerSupportMessage({ data: f.value }));
    this.isSendSuccess = true;
  }

  clearFeedback() {
    this.store.dispatch(FromCustomerActions.clearCustomerSupportStatus());
  }
}
