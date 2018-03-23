import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { DataSourcesComponent } from "./data-sources.component";
import { DataSourcesRoutingModule } from "./data-sources-routing.module";

@NgModule({
  imports: [
    SharedModule,
    DataSourcesRoutingModule
  ],
  declarations: [
    DataSourcesComponent
  ]
})
export class DataSourcesModule {}
