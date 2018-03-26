import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.checkLogin(state.url);
    return true;
  }

  private checkLogin(url: string): void {
    if (!localStorage.getItem('loginData')) {
      this.router.navigate(['/login']);
    }
  }
}
