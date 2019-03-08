import { customersInitialState, CustomersState } from './customers.state';
import { CustomersActions, CustomersActionTypes } from './customers.actions';

export function customersReducer(state = customersInitialState, action: CustomersActions): CustomersState {
  switch (action.type) {

    case CustomersActionTypes.CUSTOMERS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case CustomersActionTypes.CUSTOMERS_LOADED: {
      return Object.assign({}, state, {
        customers: action.payload.customers,
        isLoading: false,
      });
    }

    case CustomersActionTypes.CUSTOMERS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
