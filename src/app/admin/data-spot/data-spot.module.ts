import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { DataSpotComponent } from "./data-spot.component";
import { DataSpotRoutingModule } from "./data-spot-routing.module";

@NgModule({
  imports: [
    SharedModule,
    DataSpotRoutingModule
  ],
  declarations: [
    DataSpotComponent
  ]
})
export class DataSpotModule {}
