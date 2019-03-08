import { chartsReducer } from './charts.reducer';
import { chartsInitialState } from './charts.state';

describe('Charts Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = chartsReducer(chartsInitialState, action);

      expect(result).toBe(chartsInitialState);
    });
  });
});
