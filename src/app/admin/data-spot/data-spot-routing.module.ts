import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataSpotComponent } from "./data-spot.component";

const routes: Routes = [
  { path: '', component: DataSpotComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DataSpotRoutingModule {}
