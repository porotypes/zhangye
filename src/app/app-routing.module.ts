import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./core/auth/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]
  },
  {
    path: 'oneMaps', loadChildren: './oneMaps/oneMaps.module#OneMapsModule', canActivate: [AuthGuard]
  },
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule {}
