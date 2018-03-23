import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [],
  exports: [
    CommonModule
  ],
  providers: [

  ]
})
export class SharedModule {}
