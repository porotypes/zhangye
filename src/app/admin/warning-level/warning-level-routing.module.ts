import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WarningLevelComponent } from "./warning-level.component";

const routes: Routes = [
  { path: '', component: WarningLevelComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WarningLevelRoutingModule {}
