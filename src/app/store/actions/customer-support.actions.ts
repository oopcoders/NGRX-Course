import { CustomerMessage } from 'src/app/shared/models/customer-message';
import { createAction, props } from '@ngrx/store';

export const sendCustomerSupportMessage = createAction(
  '[Customer Support Component] Sending Customer Support Message',
  props<{ data: CustomerMessage }>()
);
