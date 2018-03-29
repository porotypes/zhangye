import { Component, OnInit } from '@angular/core';
import { AuthService } from "./core/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = '张掖市自然灾害监测预警系统';
  _userToken: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getUserToken(): void {
    this._userToken = this.authService.decodeToken();
  }

  loginOut(): void {
    window.localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
