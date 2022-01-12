import { CustomerMessage } from 'src/app/shared/models/customer-message';
import { createAction, props } from '@ngrx/store';

export const sendCustomerSupportMessage = createAction(
  '[Customer Support Component] Sending Customer Support Message',
  props<{ data: CustomerMessage }>()
);

export const sendCustomerSupportStatus = createAction(
  '[Customer Support Effect] Sending Customer Support Status',
  props<{ isSentSuccess: boolean }>()
);

export const clearCustomerSupportStatus = createAction(
  '[Customer Support Component] Clearing Customer Support Data'
);
