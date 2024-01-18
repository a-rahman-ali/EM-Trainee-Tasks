import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticatedAdmin = this.authService.isAuthenticatedAdmin();
    const isAuthenticatedUser = this.authService.isAuthenticatedUser();

    if (isAuthenticatedUser || isAuthenticatedAdmin) {
      return true;
    } else {
      // return this.router.createUrlTree(['/user-login']);
      // return this.router.createUrlTree(['/admin-login']);
      return false;
    }
  }
    
}
