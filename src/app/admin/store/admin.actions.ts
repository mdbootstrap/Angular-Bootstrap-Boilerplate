import { Action } from '@ngrx/store';
import { Project } from '../../projects/models/project.model';
import { Customer } from '../../customers/models/customer.model';

export enum AdminActionTypes {
  GET_USERS_LIST = '[Admin] Get Users List',
  USERS_LIST_FETCHED = '[Admin] Users list fetched',

  GET_USER_PROJECTS = '[Admin] Get user projects',
  USERS_PROJECTS_LOADED = '[Admin] User projects loaded',
  DELETE_USER_PROJECT = '[Admin] Delete user project',

  GET_USER_CUSTOMERS = '[Admin] Get user customers',
  USERS_CUSTOMERS_LOADED = '[Admin] User customers loaded',
  DELETE_USER_CUSTOMER = '[Admin] Delete user customer',

  ADD_ADMIN_PRIVILEGES = '[Admin] Add admin privileges',
  REMOVE_ADMIN_PRIVILEGES = '[Admin] Remove admin privileges',

  ADMIN_ERROR = '[Admin] Error'
}

export class GetUsersList implements Action {
  readonly type = AdminActionTypes.GET_USERS_LIST;
}

export class UsersListFetched implements Action {
  readonly type = AdminActionTypes.USERS_LIST_FETCHED;

  constructor(public payload: { usersList: any[] }) {}
}

export class GetUserProjects implements Action {
  readonly type = AdminActionTypes.GET_USER_PROJECTS;

  constructor(public payload: { uid: string }) {}
}

export class DeleteUserProject implements Action {
  readonly type = AdminActionTypes.DELETE_USER_PROJECT;

  constructor(public payload: { userId: string, projectId: string}) {}
}

export class UserProjectsLoaded implements Action {
  readonly type = AdminActionTypes.USERS_PROJECTS_LOADED;

  constructor(public payload: { uid: string, userProjects: Project[] }) {}
}

export class GetUserCustomers implements Action {
  readonly type = AdminActionTypes.GET_USER_CUSTOMERS;

  constructor(public payload: { uid: string }) {}
}

export class DeleteUserCustomer implements Action {
  readonly type = AdminActionTypes.DELETE_USER_CUSTOMER;

  constructor(public payload: { userId: string, customerId: string}) {}
}

export class UserCustomersLoaded implements Action {
  readonly type = AdminActionTypes.USERS_CUSTOMERS_LOADED;

  constructor(public payload: { uid: string, userCustomers: Customer[] }) {}
}

export class AddAdminPrivileges implements Action {
  readonly type = AdminActionTypes.ADD_ADMIN_PRIVILEGES;

  constructor(public payload: { userId: string }) {}
}

export class RemoveAdminPrivileges implements Action {
  readonly type = AdminActionTypes.REMOVE_ADMIN_PRIVILEGES;

  constructor(public payload: { userId: string }) {}
}

export class AdminError implements Action {
  readonly type = AdminActionTypes.ADMIN_ERROR;

  constructor(public payload: { error: any }) {}
}

export type AdminActions =
  | GetUsersList
  | UsersListFetched
  | GetUserProjects
  | UserProjectsLoaded
  | DeleteUserProject
  | GetUserCustomers
  | UserCustomersLoaded
  | DeleteUserCustomer
  | AddAdminPrivileges
  | RemoveAdminPrivileges
  | AdminError;
