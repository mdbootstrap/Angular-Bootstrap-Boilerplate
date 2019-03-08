import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  getUser(): Observable<any> {
    return this.authService.getAuthState();
  }

  canActivate(): Observable<boolean> {

    return this.getUser()
      .pipe(
        take(1),
        switchMap((user) => {
          if (!user) {
            this.router.navigateByUrl('/login');
            return of(false);
          }
          return of(true);
        }),
        catchError(() => {
          this.router.navigateByUrl('/login');
          return of(false);
        })
      );
  }
}
