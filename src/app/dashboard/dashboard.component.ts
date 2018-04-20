import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {

  mapCateList: any[];

  constructor(
    public router: Router
  ) {}

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.mapCateList = JSON.parse(window.localStorage.getItem('MAP_CATEGORIES'));
    if (this.mapCateList) {
      this.router.navigate(['/oneMaps'], { queryParams: { cateId: this.mapCateList[0].id } });
    }
  }

}
