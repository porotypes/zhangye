import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OneMapsRoutingModule } from './oneMaps-routing.module';

import { OneMapsComponent } from './oneMaps.component';

@NgModule({
  imports:      [
    SharedModule,
    OneMapsRoutingModule
  ],
  declarations: [
    OneMapsComponent,
  ]
})
export class OneMapsModule { }
