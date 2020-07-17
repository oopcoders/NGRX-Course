import { createAction, props } from '@ngrx/store';
import { CustomerMessage } from 'src/app/shared/models/customer-message';

export const sendingCustomerSupportMessage = createAction(
  '[Customer Support Component] Sending Customer Support Message',
  props<{ data: CustomerMessage }>()
);

export const sendMessageStatus = createAction(
  '[Customer Support Effect] Send Customer Message Status',
  props<{ isSentSuccess: boolean }>()
);

export const clearForm = createAction(
  '[Customer Support Component] Clear Form'
);
