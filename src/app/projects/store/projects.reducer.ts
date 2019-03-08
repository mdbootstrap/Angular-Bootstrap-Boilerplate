import { ProjectsActions, ProjectsActionTypes } from './projects.actions';
import { projectsInitialState, ProjectsState } from './projects.state';


export function projectsReducer(state = projectsInitialState, action: ProjectsActions): ProjectsState {
  switch (action.type) {

    case ProjectsActionTypes.PROJECTS_QUERY: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case ProjectsActionTypes.PROJECTS_LOADED: {
      return Object.assign({}, state, {
        projects: action.payload.projects,
        loading: false,
      });
    }

    case ProjectsActionTypes.PROJECTS_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
