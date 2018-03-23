import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserManageComponent } from "./user-manage.component";

const routes: Routes = [
  { path: '', component: UserManageComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserManageRoutingModule {}
