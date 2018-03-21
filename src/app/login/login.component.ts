import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string;
  public password: string;

  constructor(public router: Router, private http: HttpClient) {
    this.username = localStorage.getItem('username') || null;
  }

  login(user, pwd) {
    if (!user || !pwd) {
      alert( '请输入正确的用户名和密码!');
      return;
    }
    this.http.post(environment.api_url + 'login', {
        username: user,
        password: pwd
      })
      .toPromise().then(
      response => {

      });
  }
}
