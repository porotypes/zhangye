import { Component, OnInit } from '@angular/core';

import { AdminMenuService } from "../core/admin/admin-menu.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  menuItem: any;

  constructor(
    private adminMenuService: AdminMenuService
  ) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.menuItem = this.adminMenuService.getMenuItem();
  }

}
