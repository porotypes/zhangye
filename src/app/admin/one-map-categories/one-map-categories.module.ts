import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { OneMapCategoriesComponent } from "./one-map-categories.component";
import { OneMapCategoriesRoutingModule } from "./one-map-categories-routing.module";

@NgModule({
  imports: [
    SharedModule,
    OneMapCategoriesRoutingModule
  ],
  declarations: [
    OneMapCategoriesComponent
  ]
})
export class OneMapCategoriesModule {}
