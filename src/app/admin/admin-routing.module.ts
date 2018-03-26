import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: 'userManage', loadChildren: './user-manage/user-manage.module#UserManageModule' },
      { path: 'one-maps', loadChildren: './one-maps/one-maps.module#OneMapsModule' },
      { path: 'dataSources', loadChildren: './data-sources/data-sources.module#DataSourcesModule' },
      { path: 'dataSpot', loadChildren: './data-spot/data-spot.module#DataSpotModule' },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
