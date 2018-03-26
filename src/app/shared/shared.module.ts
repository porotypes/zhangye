import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastModule.forRoot()
  ],
  declarations: [],
  exports: [
    CommonModule,
    ToastModule,
    ReactiveFormsModule
  ],
  providers: [

  ]
})
export class SharedModule {}
