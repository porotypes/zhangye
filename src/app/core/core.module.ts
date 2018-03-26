import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// service
import { AdminMenuService } from "./admin/admin-menu.service";
import { OneMapService } from "./one-map.service";
import { UserManageService } from "./admin/user-manage.service";
import { DataSourcesService } from "./admin/data-sources.service";
import { DataSpotService } from "./admin/data-spot.service";

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
    UserManageService,
    DataSourcesService,
    DataSpotService,
  ]
})
export class CoreModule {}
