import { createReducer, on } from '@ngrx/store';
// tslint:disable-next-line: import-spacing
import * as FromCustomerActions from '../actions/customer-support.actions';


export const customerSupportFeatureKey = 'customerSupport';

export interface State {
  name: string;
  isSentSuccess: boolean | null;
}

export const initialState: State = {
  name: null,
  isSentSuccess: null,
};


export const reducer = createReducer(
  initialState,
  on(FromCustomerActions.sendCustomerSupportMessage, (state, action) => {
    return {
      ...state,
      name: action.data.name,
    };
  }),
  on(FromCustomerActions.sendCustomerSupportStatus, (state, action) => {
    return {
      ...state,
      isSentSuccess: action.isSentSuccess,
    };
  }),
  on(FromCustomerActions.clearCustomerSupportStatus, (state) => {
    return {
      ...state,
      name: null,
      isSentSuccess: null,
    };
  })
);

