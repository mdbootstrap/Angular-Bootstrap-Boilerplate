import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromAdmin from './../store/admin.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { Project } from '../../projects/models/project.model';
import { of } from 'rxjs';
import { Customer } from '../../customers/models/customer.model';


@Injectable()
export class AdminEffects {

  constructor(private actions$: Actions, private adminService: AdminService) {}

  @Effect()
  getUsersList$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USERS_LIST),
    switchMap( () => this.adminService.getUsersList()
      .pipe(
        map( (users: any) => {
          const usersList: any[] = users.map((res: any) => {
            const key = res.payload.key;
            const user: any = res.payload.val();
            return {
              key: key,
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              providerId: user.providerId,
              photoUrl: user.photoUrl,
              isNewUser: user.isNewUser,
              isAdmin: user.isAdmin,
              isOnline: user.isOnline
            };
          });
          return (new fromAdmin.UsersListFetched({ usersList }));
        }),
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect()
  getUserProjects$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_PROJECTS),
    map((action: fromAdmin.GetUserProjects) => action.payload),
    mergeMap( (payload: any) => this.adminService.getUserProjects(payload.uid)
      .pipe(
        map((data: any) => {
          const projectsData: Project[] = data.map((res: any) => {
            const key = res.payload.key;
            const project: Project = res.payload.val();
            return {
              key: key || null,
              title: project.title || null,
              description: project.description || null,
              photoUrl: project.photoUrl || null
            };
          });
          return (new fromAdmin.UserProjectsLoaded({ uid: payload.uid, userProjects: projectsData }));
        }),
        catchError(error => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserProject$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_PROJECT),
    map( (action: fromAdmin.DeleteUserProject) => action.payload),
    switchMap( (payload: any) => this.adminService.deleteUserProject(payload.userId, payload.projectId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect()
  getUserCustomers$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_CUSTOMERS),
    map((action: fromAdmin.GetUserCustomers) => action.payload),
    mergeMap( (payload: any) => this.adminService.getUserCustomers(payload.uid)
      .pipe(
        map((data: any) => {
          const customersData: Customer[] = data.map((res: any) => {
            const key = res.payload.key;
            const customer: Customer = res.payload.val();
            return {
              key: key,
              id: customer.id,
              name: customer.name,
              description: customer.description
            };
          });
          return (new fromAdmin.UserCustomersLoaded({ uid: payload.uid, userCustomers: customersData }));
        }),
        catchError(error => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserCustomer$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_CUSTOMER),
    map( (action: fromAdmin.DeleteUserCustomer) => action.payload),
    switchMap( (payload: any) => this.adminService.deleteUserCustomer(payload.userId, payload.customerId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  addAdminPrivileges$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.ADD_ADMIN_PRIVILEGES),
    map( (action: fromAdmin.AddAdminPrivileges) => action.payload),
    switchMap( (payload: any) => this.adminService.addAdminPrivileges(payload.userId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  removeAdminPrivileges$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.REMOVE_ADMIN_PRIVILEGES),
    map( (action: fromAdmin.RemoveAdminPrivileges) => action.payload),
    switchMap( (payload: any) => this.adminService.removeAdminPrivileges(payload.userId)
      .pipe(
        catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );
}
