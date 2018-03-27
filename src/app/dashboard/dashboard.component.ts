import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {

  constructor(
    public router: Router
  ) { }

  ngDoCheck(): void {
    this.router.navigate(['/admin']);
  }

  ngOnInit() {

  }

}
