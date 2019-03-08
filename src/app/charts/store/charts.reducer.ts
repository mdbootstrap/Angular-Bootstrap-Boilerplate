import { chartsInitialState, ChartsState } from './charts.state';
import { ChartsActions, ChartsActionTypes } from './charts.actions';


export function chartsReducer(state = chartsInitialState, action: ChartsActions): ChartsState {
  switch (action.type) {

    case ChartsActionTypes.LINE_CHART_QUERY: {
      return Object.assign({}, state, {
        lineChartLoading: true,
      });
    }

    case ChartsActionTypes.BAR_CHART_QUERY: {
      return Object.assign({}, state, {
        barChartLoading: true
      });
    }

    case ChartsActionTypes.LINE_CHART_LOADED: {
      return Object.assign({}, state, {
        lineChartData: action.payload.lineChartData,
        lineChartLoading: false,
      });
    }

    case ChartsActionTypes.BAR_CHART_LOADED: {
      return Object.assign({}, state, {
        barChartData: action.payload.barChartData,
        barChartLoading: false,
      });
    }

    case ChartsActionTypes.CHARTS_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
