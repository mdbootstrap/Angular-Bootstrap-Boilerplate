import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CustomersState } from './customers.state';

export const getCustomersState = createFeatureSelector<CustomersState>('customers');

export const getCustomers = createSelector(
  getCustomersState,
  customers => customers.customers
);

export const getIsLoading = createSelector(
  getCustomersState,
  customers => customers.isLoading
);

export const getError = createSelector(
  getCustomersState,
  customers => customers.error
);
