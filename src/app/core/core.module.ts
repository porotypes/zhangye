import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// service
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth-guard.service";
import { AdminMenuService } from "./admin/admin-menu.service";
import { OneMapCategoriesService } from "./admin/one-map-categories.service";
import { OneMapService } from "./one-map.service";
import { UserManageService } from "./admin/user-manage.service";
import { DataSourcesService } from "./admin/data-sources.service";
import { DataSpotService } from "./admin/data-spot.service";
import { TypeOfDisasterService } from "./admin/type-of-disaster.service";
import { WarningLevelsService } from "./admin/warning-levels.service";
import { WarningRulesService } from "./admin/warning-rules.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [
  ],
  providers: [
    AuthGuard,
    AuthService,
    AdminMenuService,
    OneMapCategoriesService,
    OneMapService,
    UserManageService,
    DataSourcesService,
    DataSpotService,
    TypeOfDisasterService,
    WarningLevelsService,
    WarningRulesService
  ]
})
export class CoreModule {}
