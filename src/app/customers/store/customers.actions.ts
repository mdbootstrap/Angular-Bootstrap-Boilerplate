import { Action } from '@ngrx/store';
import { Customer } from '../models/customer.model';

export enum CustomersActionTypes {
  CUSTOMERS_QUERY = '[Customers] Query',
  CUSTOMERS_LOADED = '[Customers] Fetched',

  CUSTOMERS_ADDED = '[Customers] Added',
  CUSTOMERS_EDITED = '[Customers] Edited',
  CUSTOMERS_DELETED = '[Customers] Deleted',

  CUSTOMERS_ERROR = '[Customers] Error'
}

export class CustomersQuery implements Action {
  readonly type = CustomersActionTypes.CUSTOMERS_QUERY;
}

export class CustomersLoaded implements Action {
  readonly type = CustomersActionTypes.CUSTOMERS_LOADED;

  constructor(public payload: { customers: Customer[] }) {}
}

export class CustomersAdded implements Action {
  readonly type = CustomersActionTypes.CUSTOMERS_ADDED;

  constructor(public payload: { customer: Customer }) {}
}

export class CustomersEdited implements Action {
  readonly type = CustomersActionTypes.CUSTOMERS_EDITED;

  constructor(public payload: { customer: Customer }) {}
}

export class CustomersDeleted implements Action {
  readonly type = CustomersActionTypes.CUSTOMERS_DELETED;

  constructor(public payload: { customer: Customer }) {}
}

export class CustomersError implements Action {
  readonly type = CustomersActionTypes.CUSTOMERS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type CustomersActions =
  | CustomersQuery
  | CustomersLoaded
  | CustomersAdded
  | CustomersEdited
  | CustomersDeleted
  | CustomersError;
