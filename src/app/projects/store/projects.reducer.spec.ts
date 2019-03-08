import { projectsReducer } from './projects.reducer';
import { projectsInitialState } from './projects.state';

describe('Projects Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = projectsReducer(projectsInitialState, action);

      expect(result).toBe(projectsInitialState);
    });
  });
});
