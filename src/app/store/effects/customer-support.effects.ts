import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CustomerSupportService } from 'src/app/shared/services/customer-support.service';
// tslint:disable-next-line: import-spacing
import * as FromCustomerActions from '../actions/customer-support.actions';

@Injectable()
export class CustomerSupportEffects {

  effectName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FromCustomerActions.sendCustomerSupportMessage),
      mergeMap((action) =>
        this.customerService.sendMessage(action.data).pipe(
          map(msgSts => FromCustomerActions.sendCustomerSupportStatus({ isSentSuccess: msgSts }))
        )
      ),
    );
  });

  constructor(private actions$: Actions, private customerService: CustomerSupportService) { }
}
