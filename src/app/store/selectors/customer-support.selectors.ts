import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerSupportFeatureKey, State } from '../reducers/customer-support.reducer';

export const selectCustomerSupportFeature = createFeatureSelector<State>(
  customerSupportFeatureKey,
);

export interface CusSupportData {
  name: string;
  isSentSuccess: boolean;
}

// export const selectName = createSelector(
//   selectCustomerSupportFeature,
//   (state: State) => state.name
// );

export const customerSupportData = createSelector(
  selectCustomerSupportFeature,
  (state: State): CusSupportData => {
    return {
      name: state.name,
      isSentSuccess: state.isSentSuccess,
    };
  }
);
