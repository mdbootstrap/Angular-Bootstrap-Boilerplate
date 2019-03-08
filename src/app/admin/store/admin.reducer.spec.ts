import { adminReducer } from './admin.reducer';
import { adminInitialState } from './admin.state';

describe('Admin Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = adminReducer(adminInitialState, action);

      expect(result).toBe(adminInitialState);
    });
  });
});
