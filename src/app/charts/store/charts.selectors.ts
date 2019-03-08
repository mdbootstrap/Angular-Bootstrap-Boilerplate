import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChartsState } from './charts.state';

export const getChartsState = createFeatureSelector<ChartsState>('charts');


export const getLineChartData = createSelector(
  getChartsState,
  charts => charts.lineChartData
);

export const getBarChartData = createSelector(
  getChartsState,
  charts => charts.barChartData
);

export const getIsLoading = createSelector(
  getChartsState,
  charts => charts.barChartLoading && charts.lineChartLoading
);
