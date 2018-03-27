import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { TypeOfDisaster } from "../../common/type-of-disaster";
import { TypeOfDisasterService } from "../../core/admin/type-of-disaster.service";

@Component({
  selector: 'app-type-of-disaster',
  templateUrl: './type-of-disaster.component.html',
  styleUrls: ['./type-of-disaster.component.css']
})
export class TypeOfDisasterComponent implements OnInit {

  hintText = '灾害类型';
  addForm: FormGroup;
  editForm: FormGroup;
  disasterList: TypeOfDisaster[];
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  deleteData: TypeOfDisaster;

  constructor(
    private typeOfDisasterService: TypeOfDisasterService,
    private bsModalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      levelStandard: [''],
      comment: ['']
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      levelStandard: [''],
      comment: ['']
    });
  }

  populateEditUserForm(disasterList: TypeOfDisaster, form: FormGroup): void {
    form.patchValue({
      name: disasterList.name,
      description: disasterList.description,
      levelStandard: disasterList.levelStandard,
      comment: disasterList.comment
    });
  }

  getDisasterList(): void {
    this.typeOfDisasterService.getDisasterList().then(list => {
      this.disasterList = list;
    });
  }

  ngOnInit() {
    this.getDisasterList();
  }

  confirm(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
  }

  changeInfo(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
  }

  deleteConfirmation(template: TemplateRef<any>, disaster: TypeOfDisaster): void {
    this.deleteModalRef = this.bsModalService.show(template);
    this.deleteData = disaster;
  }

  delete(): void {

  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, disaster: TypeOfDisaster) {
    this.editModalRef = this.bsModalService.show(template);
    this.populateEditUserForm(disaster, this.editForm);
  }

}
