import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { OneMapsComponent } from "./one-maps.component";
import { OneMapsRoutingModule } from "./one-maps-routing.module";

@NgModule({
  imports: [
    SharedModule,
    OneMapsRoutingModule
  ],
  declarations: [
    OneMapsComponent
  ]
})
export class OneMapsModule {}
