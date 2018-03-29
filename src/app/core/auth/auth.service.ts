import { Injectable } from "@angular/core";
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

export const USER_KEY_TOKEN = 'token';

@Injectable()
export class AuthService {

  get user(): any {
    return this.decodeToken();
  }

  checkLogin(): boolean {
    return tokenNotExpired();
  }

  getRawJwtToken(): string {
    return window.localStorage.getItem(USER_KEY_TOKEN);
  }

  decodeToken(): any {
    const token: any = this.getRawJwtToken();
    const jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token);
  }

}
