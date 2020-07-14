import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  customerSupportFeatureKey,
} from '../reducers/customer-support.reducer';

//Get feature from store
export const selectCustomerSupportFeature = createFeatureSelector<State>(
  customerSupportFeatureKey
);

//Return name from feature
export const selectName = createSelector(
  selectCustomerSupportFeature,
  (state: State) => state.name
);

export interface CustomerSupportViewModel {
  name: string;
  isSentSuccess: boolean;
}

export const selectCustomerSupportModel = createSelector(
  selectCustomerSupportFeature,
  (state: State): CustomerSupportViewModel => {
    return {
      name: state.name,
      isSentSuccess: state.isSentSuccess,
    };
  }
);
