import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from "./core/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = '张掖市自然灾害监测预警系统';

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.authService.isLogin = localStorage.getItem('loginData') ? true : false;
  }

}
