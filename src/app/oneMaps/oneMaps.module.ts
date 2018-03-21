import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { OneMapsRoutingModule } from './oneMaps-routing.module';

import { OneMapsComponent } from './oneMaps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OneMapsRoutingModule
  ],
  declarations: [
    OneMapsComponent,
  ]
})
export class OneMapsModule { }
