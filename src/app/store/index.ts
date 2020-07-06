import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCustomerSupport from './reducers/customer-support.reducer';


export interface AppState {

  [fromCustomerSupport.customerSupportFeatureKey]: fromCustomerSupport.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromCustomerSupport.customerSupportFeatureKey]: fromCustomerSupport.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
