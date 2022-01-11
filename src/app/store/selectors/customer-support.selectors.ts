import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerSupportFeatureKey, State } from '../reducers/customer-support.reducer';

export const selectCustomerSupportFeature = createFeatureSelector<State>(
  customerSupportFeatureKey,
);

export const selectName = createSelector(
  selectCustomerSupportFeature,
  (state: State) => state.name
);
