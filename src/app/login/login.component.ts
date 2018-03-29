import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../core/auth/auth.service";
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string;
  public password: string;

  constructor(
    public router: Router,
    private http: HttpClient,
    public authService: AuthService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  login() {
    if (!this.username || !this.password) {
      alert( '请输入正确的用户名和密码!');
      return;
    }
    this.http.post(environment.api_url + 'login', {
        username: this.username,
        password: this.password
      })
      .toPromise()
      .then(response => {
        if (response['code'] === 0) {
          this.router.navigate(['/dashboard']);
          window.localStorage.setItem('token', response['result']);
        } else {
          this.router.navigate(['/login']);
          this.toastr.error('用户名或密码错误', '提示');
        }
      });
  }
}
