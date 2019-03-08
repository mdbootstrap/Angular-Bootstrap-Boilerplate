import { adminInitialState, AdminState } from './admin.state';
import { AdminActions, AdminActionTypes } from './admin.actions';

export function adminReducer(state = adminInitialState, action: AdminActions): AdminState {
  switch (action.type) {

    case AdminActionTypes.GET_USERS_LIST: {
      return Object.assign({}, state, {
        usersListLoading: true
      });
    }

    case AdminActionTypes.USERS_LIST_FETCHED: {
      return Object.assign({}, state, {
        usersList: action.payload.usersList,
        usersListLoading: false
      });
    }

    case AdminActionTypes.GET_USER_PROJECTS: {
      return Object.assign({}, state, {
        userProjectsLoading: true
      });
    }

    case AdminActionTypes.USERS_PROJECTS_LOADED: {
      return Object.assign({}, state, {
        userProjects: {...state.userProjects, [action.payload.uid]: action.payload.userProjects},
        userProjectsLoading: false
      });
    }

    case AdminActionTypes.GET_USER_CUSTOMERS: {
      return Object.assign({}, state, {
        userCustomersLoading: true
      });
    }

    case AdminActionTypes.USERS_CUSTOMERS_LOADED: {
      return Object.assign({}, state, {
        userCustomers: {...state.userCustomers, [action.payload.uid]: action.payload.userCustomers},
        userCustomersLoading: false
      });
    }

    case AdminActionTypes.ADMIN_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
