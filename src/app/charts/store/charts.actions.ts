import { Action } from '@ngrx/store';

export enum ChartsActionTypes {
  LINE_CHART_QUERY = '[Charts] Line chart query',
  LINE_CHART_LOADED = '[Charts] Line chart loaded',

  BAR_CHART_QUERY = '[Charts] Bar chart query',
  BAR_CHART_LOADED = '[Charts] Bar chart loaded',

  CHARTS_ERROR = '[Charts] Error'
}

export class LineChartQuery implements Action {
  readonly type = ChartsActionTypes.LINE_CHART_QUERY;

  constructor(public payload: { currency: string }) {}
}

export class BarChartQuery implements Action {
  readonly type = ChartsActionTypes.BAR_CHART_QUERY;
}

export class LineChartLoaded implements Action {
  readonly type = ChartsActionTypes.LINE_CHART_LOADED;

  constructor(public payload: { lineChartData: any }) {}
}

export class BarChartLoaded implements Action {
  readonly type = ChartsActionTypes.BAR_CHART_LOADED;

  constructor(public payload: { barChartData: any }) {}
}

export class ChartsError implements Action {
  readonly type = ChartsActionTypes.CHARTS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type ChartsActions =
  | LineChartQuery
  | LineChartLoaded
  | BarChartQuery
  | BarChartLoaded
  | ChartsError;
