import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// service
import { AdminMenuService } from "./admin/admin-menu.service";
import { OneMapService } from "./one-map.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [
  ],
  providers: [
    AdminMenuService,
    OneMapService,
  ]
})
export class CoreModule {}
