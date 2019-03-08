import { customersReducer } from './customers.reducer';
import { customersInitialState } from './customers.state';

describe('Customers Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = customersReducer(customersInitialState, action);

      expect(result).toBe(customersInitialState);
    });
  });
});
