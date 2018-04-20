import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OneMapCategoriesComponent } from "./one-map-categories.component";

const routes: Routes = [
  { path: '', component: OneMapCategoriesComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class OneMapCategoriesRoutingModule {}
