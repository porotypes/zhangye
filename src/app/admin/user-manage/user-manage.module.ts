import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { UserManageComponent } from "./user-manage.component";
import { UserManageRoutingModule } from "./user-manage-routing.module";

@NgModule({
  imports: [
    SharedModule,
    UserManageRoutingModule
  ],
  declarations: [
    UserManageComponent
  ]
})
export class UserManageModule {}
