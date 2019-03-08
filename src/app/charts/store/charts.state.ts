export interface ChartsState {
  lineChartData: any;
  barChartData: any;
  lineChartLoading: boolean;
  barChartLoading: boolean;
  error: any;
}

export const chartsInitialState: ChartsState = {
  lineChartData: {},
  barChartData: {},
  lineChartLoading: false,
  barChartLoading: false,
  error: null
};
