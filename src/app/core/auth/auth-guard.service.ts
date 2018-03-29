import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.checkLogin(state.url);
    return true;
  }

  private checkLogin(url: string): void {
    if (!this.authService.checkLogin()) {
      this.router.navigate(['/login']);
      window.localStorage.removeItem('token');
    }
  }
}
