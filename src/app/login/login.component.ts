import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from "../core/auth/auth.service";
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

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
    public authService: AuthService
  ) { }

  login() {
    if (!this.username || !this.password) {
      alert( '请输入正确的用户名和密码!');
      return;
    }
    // this.http.post(environment.api_url + 'login', {
    //     username: this.username,
    //     password: this.password
    //   })
    //   .toPromise()
    //   .then(response => {
    //     console.log(response);
    //   });
    localStorage.setItem("loginData", 'logined');
    this.router.navigate(['/dashboard']);
    this.authService.isLogin = true;
  }
}
