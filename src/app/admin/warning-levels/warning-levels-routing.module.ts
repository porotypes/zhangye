import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WarningLevelsComponent } from "./warning-levels.component";

const routes: Routes = [
  { path: '', component: WarningLevelsComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WarningLevelsRoutingModule {}
