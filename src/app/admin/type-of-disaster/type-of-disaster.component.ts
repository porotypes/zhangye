import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { TypeOfDisaster } from "../../common/type-of-disaster";
import { TypeOfDisasterService } from "../../core/admin/type-of-disaster.service";
import { FormUtil } from "../../core/util/form.util";

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

  dataKeys = [
    { key: 'name', text: '名称', isRequired: true },
    { key: 'description', text: '描述', isRequired: true },
    { key: 'levelStandard', text: '等级标准', isRequired: true },
    { key: 'comment', text: '备注', isRequired: true },
  ];

  constructor(
    private typeOfDisasterService: TypeOfDisasterService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, true));
  }

  populateEditUserForm(disasterList: TypeOfDisaster, form: FormGroup): void {
    form.patchValue(FormUtil.populateForm(this.dataKeys, disasterList));
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
    this.typeOfDisasterService.addDisaster(FormUtil.getFormValue(this.dataKeys, form))
      .then(res => {
        this.getDisasterList();
        this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
        this.addModalRef.hide();
        this.addForm.reset();
      });
  }

  changeInfo(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    this.typeOfDisasterService.changeDisaster(form.get('id').value, FormUtil.getFormValue(this.dataKeys, form))
      .then(res => {
        this.getDisasterList();
        this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
        this.editModalRef.hide();
      });
  }

  deleteConfirmation(template: TemplateRef<any>, disaster: TypeOfDisaster): void {
    this.deleteModalRef = this.bsModalService.show(template);
    this.deleteData = disaster;
  }

  delete(): void {
    this.typeOfDisasterService.deleteDisaster(this.deleteData).then(res => {
      this.getDisasterList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, disaster: TypeOfDisaster) {
    this.editModalRef = this.bsModalService.show(template);
    this.populateEditUserForm(disaster, this.editForm);
  }

}
