import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'oneMaps', loadChildren: './oneMaps/oneMaps.module#OneMapsModule'
  },
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule {}
