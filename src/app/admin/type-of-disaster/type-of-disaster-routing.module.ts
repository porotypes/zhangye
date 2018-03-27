import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TypeOfDisasterComponent } from "./type-of-disaster.component";

const routes: Routes = [
  { path: '', component: TypeOfDisasterComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TypeOfDisasterRoutingModule {}
