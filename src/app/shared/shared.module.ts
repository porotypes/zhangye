import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng2-select';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { NgSelectPipe } from './pipe/select.pipe'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    SelectModule,
    ToastModule.forRoot()
  ],
  declarations: [
    NgSelectPipe
  ],
  exports: [
    CommonModule,
    SelectModule,
    ToastModule,
    ReactiveFormsModule,
    BsDropdownModule,

    NgSelectPipe
  ],
  providers: [

  ]
})
export class SharedModule {}
