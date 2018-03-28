import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { WarningLevel } from "../../common/warning-level";
import { WarningLevelsService } from "../../core/admin/warning-levels.service";
import { FormUtil } from "../../core/util/form.util";

@Component({
  selector: 'app-warning-levels',
  templateUrl: './warning-levels.component.html',
  styleUrls: ['./warning-levels.component.css']
})
export class WarningLevelsComponent implements OnInit {
  hintText = '灾害预警等级';
  addForm: FormGroup;
  editForm: FormGroup;
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  dataList: WarningLevel[];
  deleteData: WarningLevel;

  dataKeys = [
    { key: 'name', text: '名称', isRequired: true },
    { key: 'signal', text: '信号', isRequired: true },
    { key: 'content', text: '描述', isRequired: true },
  ];

  constructor(
    private warningLevelsService: WarningLevelsService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getList();
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, true));
  }

  populateEditForm(data: WarningLevel, form: FormGroup): void {
    form.patchValue(FormUtil.populateForm(this.dataKeys, data));
  }

  getList(): void {
    this.warningLevelsService.getSourcesList().then(dataList => {
      this.dataList = dataList;
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, warningLevel: WarningLevel) {
    this.populateEditForm(warningLevel, this.editForm);
    this.editModalRef = this.bsModalService.show(template);
  }

  openDeleteModal(template: TemplateRef<any>, warningLevel: WarningLevel) {
    this.deleteData = warningLevel;
    this.deleteModalRef = this.bsModalService.show(template);
  }

  addConfirmation(form: FormGroup): void {
    this.warningLevelsService.addWarning(FormUtil.getFormValue(this.dataKeys, form)).then(res => {
      this.getList();
      this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
      this.addModalRef.hide();
      this.addForm.reset();
    });
  }

  editConfirmation(form: FormGroup): void {
    this.warningLevelsService.editWarning(form.get('id').value, FormUtil.getFormValue(this.dataKeys, form)).then(res => {
      this.getList();
      this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
      this.editModalRef.hide();
    });
  }

  delete(warningLevel: WarningLevel): void {
    this.warningLevelsService.deleteWarning(warningLevel).then(res => {
      this.getList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }
  deleteConfirmation(): void {
    this.delete(this.deleteData);
  }
}
