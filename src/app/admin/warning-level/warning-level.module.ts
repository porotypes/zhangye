import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { WarningLevelComponent } from "./warning-level.component";
import { WarningLevelRoutingModule } from "./warning-level-routing.module";

@NgModule({
  imports: [
    SharedModule,
    WarningLevelRoutingModule
  ],
  declarations: [
    WarningLevelComponent
  ]
})
export class WarningLevelModule {}
