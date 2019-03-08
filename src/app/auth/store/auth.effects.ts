import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of, defer } from 'rxjs';
import { map, switchMap, catchError, tap, take } from 'rxjs/operators';

import * as auth from './../store/auth.actions';
import { User } from '../models/user.model';
import { GravatarService } from '../../shared/services/gravatar.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private gravatarService: GravatarService,
    private router: Router,
  ) {}

  @Effect()
  registerAction$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.REGISTER_REQUESTED),
    map((action: auth.RegisterRequested) => action.payload),
    switchMap(payload =>
      this.authService.register(payload.email, payload.password).pipe(
        map((res: any) => {
          const gravatarUrl = this.gravatarService.getUserGravatar(res.user.email);
          const user = {
            uid: res.user.uid,
            displayName: payload.username || res.user.displayName,
            email: res.user.email,
            providerId: res.additionalUserInfo.providerId,
            photoUrl: res.user.photoURL || gravatarUrl,
            isNewUser: res.additionalUserInfo.isNewUser,
            isAdmin: false,
            isOnline: true
          };
          return user;
        }),
        switchMap( (user: User) => {
          return [
            new auth.RegisterCompleted(),
            new auth.LoginSuccess({ user }),
            new auth.UpdateProfile({ displayName: payload.username, photoUrl: user.photoUrl }),
            new auth.SaveUser( { user })
          ];
        }),
        tap(() => { this.router.navigateByUrl(''); }),
        catchError(error => of(new auth.AuthError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  saveUser$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.SAVE_USER),
    map( (action: auth.SaveUser) => action.payload),
    switchMap( (payload: any) => this.authService.saveUser(payload.user))
  );

  @Effect({ dispatch: false })
  updateOnlineStatus$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.UPDATE_ONLINE_STATUS),
    map( (action: auth.UpdateOnlineStatus) => action.payload),
    switchMap( (payload: any) => this.authService.updateOnlineStatus(payload.uid, payload.status))
  );

  @Effect()
  checkUserRole$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.CHECK_USER_ROLE),
    map( (action: auth.CheckUserRole) => action.payload),
    switchMap( (payload: any) => this.authService.checkUserRole(payload.uid)
      .pipe(
        map( (isAdmin: boolean) => {
          return new auth.UpdateUserRole({ isAdmin });
        }),
        catchError( (error: any) => of(new auth.AuthError({ error })))
      )
    )
  );

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.UPDATE_PROFILE),
    map((action: auth.UpdateProfile) => action.payload),
    switchMap((payload: any) =>
      this.authService.updateProfile(payload.displayName, payload.photoUrl).pipe(
        map( () => {
          const currentUser: any = this.authService.getCurrentUser();
            const updatedUser: any = {
              uid: currentUser.uid || null,
              displayName: currentUser.displayName || null,
              email: currentUser.email || null,
              providerId: currentUser.providerData[0].providerId || null,
              photoUrl: currentUser.photoURL || null
          };
          return new auth.UpdateProfileSuccess( { user: updatedUser });
        }),
        catchError( (error) => of(new auth.AuthError(error)))
      )
    )
  );


  @Effect()
  loginAction$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_REQUESTED),
    map((action: auth.LoginRequested) => action.payload),
    switchMap(payload =>
      this.authService.login(payload.email, payload.password).pipe(
        map((res: any) => {
          const user = {
            uid: res.user.uid,
            displayName: res.user.displayName,
            email: res.user.email,
            providerId: res.additionalUserInfo.providerId,
            photoUrl: res.user.photoURL,
            isNewUser: res.additionalUserInfo.isNewUser
          };
          return new auth.LoginSuccess( {user });
        }),
/*         switchMap( (user: any) => {
          if (user.isNewUser) {
            return [
              new auth.LoginSuccess({ user }),
              new auth.SaveUser( { uid: user.uid, name: user.displayName }),
              new auth.CheckUserRole( {uid: user.uid })
            ];
          } else {
            return [ new auth.LoginSuccess( {user }), new auth.CheckUserRole({ uid: user.uid })];
          }
        }), */
        tap(() => this.router.navigateByUrl('')),
        catchError(error => of(new auth.AuthError({ error })))
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_SUCCESS),
    map( (action: auth.SaveUser) => action.payload),
    switchMap( (payload: any) => {
        return [
          new auth.UpdateOnlineStatus({ uid: payload.user.uid, status: true }),
          new auth.CheckUserRole( {uid: payload.user.uid })
        ];
    })
  );

  @Effect()
  socialLogin$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.SOCIAL_LOGIN),
    map((action: auth.SocialLogin) => action.payload),
    switchMap(payload => this.authService.socialLogin(payload.authProvider)
      .pipe(
        map( (res: any) => {
          const user = {
            uid: res.user.uid,
            displayName: res.user.displayName,
            email: res.user.email,
            providerId: res.additionalUserInfo.providerId,
            photoUrl: res.user.photoURL,
            isNewUser: res.additionalUserInfo.isNewUser
          };
          return user;
        }),
        switchMap( (user: User) => {
          if (user.isNewUser) {
            return [
              new auth.LoginSuccess({ user }),
              new auth.SaveUser({ user }),
              new auth.CheckUserRole({ uid: user.uid })
            ];
          } else {
            return [new auth.LoginSuccess({ user }), new auth.CheckUserRole({ uid: user.uid })];
          }
        }),
        tap(() => this.router.navigateByUrl('')),
        catchError(error => {
          return of(new auth.AuthError({ error }));
        })
      )
    )
  );

  @Effect()
  logoutAction$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGOUT_REQUESTED),
    map( (action: auth.LogoutRequested) => action.payload),
    switchMap((payload: any) => this.authService.logout(payload.user.uid)
      .pipe(
        map(() => (new auth.LogoutCompleted())),
        tap(() => this.router.navigateByUrl('')),
        catchError(error => {
          return of(new auth.AuthError({ error }));
        }
        )
      )
    )
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.GET_USER),
    switchMap(() => this.authService.getAuthState()
      .pipe(
        take(1),
        map((authData: any) => {
          if (authData) {
            const user = {
              uid: authData.uid,
              displayName: authData.displayName,
              email: authData.email,
              providerId: authData.providerData[0].providerId,
              photoUrl: authData.photoURL,
            };
            return new auth.LoginSuccess({ user });
          } else {
            return new auth.LoginFailed();
          }
        }),
        catchError(error => of(new auth.AuthError({ error })))
      )
    )
  );

  @Effect()
  init$: Observable<any> = defer(() => {
    return of(new auth.GetUser());
  });
}
