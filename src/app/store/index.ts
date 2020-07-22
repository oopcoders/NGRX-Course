import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCustomerSupport from './reducers/customer-support.reducer';
import * as fromAuth from './reducers/auth.reducer';


export interface AppState {

  [fromCustomerSupport.customerSupportFeatureKey]: fromCustomerSupport.State;
  [fromAuth.authFeatureKey]: fromAuth.State;

}

export const reducers: ActionReducerMap<AppState> = {

  [fromCustomerSupport.customerSupportFeatureKey]: fromCustomerSupport.reducer,

  [fromAuth.authFeatureKey]: fromAuth.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
