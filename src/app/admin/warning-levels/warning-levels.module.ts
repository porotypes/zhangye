import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { WarningLevelsComponent } from "./warning-levels.component";
import { WarningLevelsRoutingModule } from "./warning-levels-routing.module";

@NgModule({
  imports: [
    SharedModule,
    WarningLevelsRoutingModule
  ],
  declarations: [
    WarningLevelsComponent
  ]
})
export class WarningLevelsModule {}
