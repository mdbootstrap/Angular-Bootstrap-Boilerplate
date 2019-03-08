import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CustomersService } from '../services/customers.service';
import { CustomersActionTypes } from './customers.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

import * as fromCustomers from './../store/customers.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class CustomersEffects {

  constructor(private actions$: Actions, private customersService: CustomersService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(CustomersActionTypes.CUSTOMERS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.customersService.get(user.uid)
      .pipe(
        map((data: any) => {
          const customersData: Customer[] = data.map((res: any) => {
            const key = res.payload.key;
            const customer: Customer = res.payload.val();
            return {
              key: key,
              id: customer.id,
              name: customer.name,
              description: customer.description
            };
          });
          return (new fromCustomers.CustomersLoaded({ customers: customersData }));
        }),
        catchError(error => {
          return of(new fromCustomers.CustomersError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(CustomersActionTypes.CUSTOMERS_ADDED),
    map((action: fromCustomers.CustomersAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.customersService.add(payload.customer, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(CustomersActionTypes.CUSTOMERS_EDITED),
    map((action: fromCustomers.CustomersEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.customersService.update(payload.customer, user.uid)
    .pipe(
      catchError( error => {
      return of(new fromCustomers.CustomersError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(CustomersActionTypes.CUSTOMERS_DELETED),
    map((action: fromCustomers.CustomersDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.customersService.delete(payload.customer, user.uid))
  );
}
