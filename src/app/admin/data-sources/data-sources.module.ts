import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';

import { DataSourcesComponent } from "./data-sources.component";
import { DataSourcesRoutingModule } from "./data-sources-routing.module";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DataSourcesRoutingModule
  ],
  declarations: [
    DataSourcesComponent
  ]
})
export class DataSourcesModule {}
