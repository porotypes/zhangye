import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WarningRulesComponent } from "./warning-rules.component";

const routes: Routes = [
  { path: '', component: WarningRulesComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WarningRulesRoutingModule {}
