import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.handleResult(!!localStorage.getItem('token'));
  }

  private handleResult(authorized: boolean) {
    if (authorized) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
