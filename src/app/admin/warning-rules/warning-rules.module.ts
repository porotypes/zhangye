import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { WarningRulesComponent } from "./warning-rules.component";
import { WarningRulesRoutingModule } from "./warning-rules-routing.module";

@NgModule({
  imports: [
    SharedModule,
    WarningRulesRoutingModule
  ],
  declarations: [
    WarningRulesComponent
  ]
})
export class WarningRulesModule {}
