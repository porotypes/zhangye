import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule {}
