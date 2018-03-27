import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: 'userManage', loadChildren: './user-manage/user-manage.module#UserManageModule' },
      { path: 'oneMaps', loadChildren: './one-maps/one-maps.module#OneMapsModule' },
      { path: 'dataSources', loadChildren: './data-sources/data-sources.module#DataSourcesModule' },
      { path: 'dataSpot', loadChildren: './data-spot/data-spot.module#DataSpotModule' },
      { path: 'typeOfDisaster', loadChildren: './type-of-disaster/type-of-disaster.module#TypeOfDisasterModule' },
      { path: 'WarningRules', loadChildren: './warning-rules/warning-rules.module#WarningRulesModule' },
      { path: 'WarningLevels', loadChildren: './warning-levels/warning-levels.module#WarningLevelsModule' },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
