import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { TypeOfDisasterComponent } from "./type-of-disaster.component";
import { TypeOfDisasterRoutingModule } from "./type-of-disaster-routing.module";

@NgModule({
  imports: [
    SharedModule,
    TypeOfDisasterRoutingModule
  ],
  declarations: [
    TypeOfDisasterComponent
  ]
})
export class TypeOfDisasterModule {}
