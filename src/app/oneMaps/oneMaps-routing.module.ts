import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OneMapsComponent } from './oneMaps.component';

const routes: Routes = [
  { path: '', component: OneMapsComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class OneMapsRoutingModule {}
