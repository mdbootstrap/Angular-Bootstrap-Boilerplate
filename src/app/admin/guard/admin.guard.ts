import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private adminService: AdminService, private afAuth: AngularFireAuth) {}


  canActivate(): Observable<boolean> | boolean {

    return this.afAuth.authState
      .pipe(
        take(1),
        switchMap( (user: any) => {
          if (!user) {
            this.router.navigateByUrl('/login');
            return of(false);
          }
          return this.adminService.checkAdminRole(user.uid)
          .pipe(
            map( (isAdmin) => {
              if (isAdmin) {
                return true;
              } else {
                this.router.navigateByUrl('');
                return false;
              }
            }),
            catchError( () => {
              this.router.navigateByUrl('');
              return of(false);
            })
          );
          }),
      );
  }
}
