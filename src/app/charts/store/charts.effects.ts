import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ChartsService } from '../services/charts.service';

import * as fromCharts from './../store/charts.actions';
import { ChartsActionTypes } from './../store/charts.actions';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getLineChartData, getBarChartData } from './charts.selectors';

@Injectable()
export class ChartsEffects {

  constructor(private actions$: Actions, private chartsService: ChartsService, private store: Store<AppState>) {}

  @Effect()
  lineChartQuery$ = this.actions$.pipe(
    ofType<fromCharts.LineChartQuery>(ChartsActionTypes.LINE_CHART_QUERY),
    map( (action: fromCharts.LineChartQuery) => action.payload),
    withLatestFrom(this.store.pipe(select(getLineChartData))),
    switchMap( ([payload, chartsData]) =>  {
      if (!chartsData.values || (chartsData.currencyName && chartsData.currencyName !== payload.currency)) {
          return this.chartsService.getExchangeRates(payload.currency)
          .pipe(
            map( (data: any) => new fromCharts.LineChartLoaded({ lineChartData: data })),
            catchError( (error: any) => of(new fromCharts.ChartsError({ error }))
          ));
      }
      return of(new fromCharts.LineChartLoaded({ lineChartData: chartsData }));
    })
  );

  @Effect()
  barChartQuery$ = this.actions$.pipe(
    ofType<fromCharts.BarChartQuery>(ChartsActionTypes.BAR_CHART_QUERY),
    withLatestFrom(this.store.pipe(select(getBarChartData))),
    switchMap( ([, chartData]) => {
      if (!chartData.values) {
        return this.chartsService.getLatestExchangeRates()
        .pipe(
          map( (data: any) => new fromCharts.BarChartLoaded({ barChartData: data })),
          catchError( (error: any) => of(new fromCharts.ChartsError( { error })))
        );
      }
      return of(new fromCharts.BarChartLoaded({ barChartData: chartData }));
    })
  );
}
