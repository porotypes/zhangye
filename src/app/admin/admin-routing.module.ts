import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../core/auth/auth-guard.service";

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'oneMaps', pathMatch: 'full' },
      { path: 'userManage',
        loadChildren: './user-manage/user-manage.module#UserManageModule',
        canActivate: [AuthGuard]
      },
      { path: 'oneMapCategories',
        loadChildren: './one-map-categories/one-map-categories.module#OneMapCategoriesModule',
        canActivate: [AuthGuard]
      },
      { path: 'oneMaps',
        loadChildren: './one-maps/one-maps.module#OneMapsModule',
        canActivate: [AuthGuard]
      },
      { path: 'dataSources',
        loadChildren: './data-sources/data-sources.module#DataSourcesModule',
        canActivate: [AuthGuard]
      },
      { path: 'dataSpot',
        loadChildren: './data-spot/data-spot.module#DataSpotModule',
        canActivate: [AuthGuard]
      },
      { path: 'typeOfDisaster',
        loadChildren: './type-of-disaster/type-of-disaster.module#TypeOfDisasterModule',
        canActivate: [AuthGuard]
      },
      { path: 'WarningRules',
        loadChildren: './warning-rules/warning-rules.module#WarningRulesModule',
        canActivate: [AuthGuard]
      },
      { path: 'WarningLevels',
        loadChildren: './warning-levels/warning-levels.module#WarningLevelsModule',
        canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
