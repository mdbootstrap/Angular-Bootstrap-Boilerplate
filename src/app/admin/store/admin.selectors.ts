import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducers/index';

export const getAdminState = (state: AppState) => state.admin;

export const getUsersList = createSelector(
  getAdminState,
  admin => admin.usersList
);

export const getUsersListLoading = createSelector(
  getAdminState,
  admin => admin.usersListLoading
);

export const getSelectedUser = createSelector(
  getUsersList,
  (usersList: any, uid: string) => usersList.filter( (user: any) => user.uid === uid)[0]
);

export const getUserProjects = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userProjects.hasOwnProperty(uid)) {
      return admin.userProjects[uid];
    } else {
      return null;
    }
  }
);

export const getUserCustomers = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userCustomers.hasOwnProperty(uid)) {
      return admin.userCustomers[uid];
    } else {
      return null;
    }
  }
);

export const getUserProjectsLoading = createSelector(
  getAdminState,
  admin => admin.userProjectsLoading
);

export const getUserCustomersLoading = createSelector(
  getAdminState,
  admin => admin.userCustomersLoading
);
