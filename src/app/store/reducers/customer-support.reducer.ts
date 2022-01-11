import { createReducer, on } from '@ngrx/store';
import { sendCustomerSupportMessage } from '../actions/customer-support.actions';


export const customerSupportFeatureKey = 'customerSupport';

export interface State {
  name: string;
}

export const initialState: State = {
  name: null
};


export const reducer = createReducer(
  initialState,
  on(sendCustomerSupportMessage, (state, action) => {
    return {
      ...state,
      name: action.data.name,
    };
  })
);

