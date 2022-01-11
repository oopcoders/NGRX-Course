import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerSupportService } from 'src/app/shared/services/customer-support.service';
import { sendCustomerSupportMessage } from 'src/app/store/actions/customer-support.actions';
import { selectName } from 'src/app/store/selectors/customer-support.selectors';
import { AppState } from './../../store/index';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  constructor(
    private customerSupportService: CustomerSupportService,
    private store: Store<AppState>
  ) { }

  isSendSuccess: boolean | null = null;

  name$: Observable<string>;

  ngOnInit(): void {

    this.name$ = this.store.pipe(select(selectName));

  }

  onSubmit(f: NgForm) {
    // this.customerSupportService.sendMessage(f.value).subscribe((success) => {
    //   console.log(success);
    //   this.isSendSuccess = success;
    // });
    this.store.dispatch(sendCustomerSupportMessage({ data: f.value }));
  }

  clearFeedback() {
    this.isSendSuccess = null;
  }
}
