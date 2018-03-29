import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../core/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // if (!this.authService.checkLogin()) {
    //   this.router.navigate(['/login']);
    //   return;
    // }
    this.router.navigate(['/admin']);
  }

}
