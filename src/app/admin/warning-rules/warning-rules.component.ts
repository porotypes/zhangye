import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { WarningRules } from "../../common/warning-rules";
import { WarningRulesService } from "../../core/admin/warning-rules.service";
import { WarningLevel } from "../../common/warning-level";
import { WarningLevelsService } from "../../core/admin/warning-levels.service";
import { FormUtil } from "../../core/util/form.util";

@Component({
  selector: 'app-warning-rules',
  templateUrl: './warning-rules.component.html',
  styleUrls: ['./warning-rules.component.css']
})
export class WarningRulesComponent implements OnInit {

  hintText = '预警规则';
  addForm: FormGroup;
  editForm: FormGroup;
  warningRulesList: WarningRules[];
  deleteData: WarningRules;
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  warningLevelList: WarningLevel[];
  selectedWarningLevel: WarningLevel;

  dataKeys = [
    { key: 'name', text: '姓名', isRequired: true },
    { key: 'description', text: '描述', isRequired: true },
    { key: 'prewarningLevel', text: '预警等级', isRequired: true },
    { key: 'disaster', text: '灾害类型', isRequired: true },
    { key: 'dataColumn', text: '数据源', isRequired: true },
    { key: 'min', text: '最小值', isRequired: true },
    { key: 'max', text: '最大值', isRequired: true },
  ];

  constructor(
    private warningRulesService: WarningRulesService,
    private warningLevelsService: WarningLevelsService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
  }

  getList(): void {
    this.warningRulesService.getWarningRulesList().then(dataList => {
      this.warningRulesList = dataList;
    });
  }

  getWarningLevelsList(): void {
    this.warningLevelsService.getSourcesList().then(list => {
      this.warningLevelList = list;
    });
  }

  ngOnInit() {
    this.getList();
    this.getWarningLevelsList()
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, true));
  }

  populateEditForm(warningRules: WarningRules, form: FormGroup): void {
    form.patchValue(FormUtil.populateForm(this.dataKeys, warningRules));
  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, warningRule: WarningRules) {
    this.populateEditForm(warningRule, this.editForm);
    this.editModalRef = this.bsModalService.show(template);
  }

  openDeleteModal(template: TemplateRef<any>, warningRule: WarningRules) {
    this.deleteData = warningRule;
    this.deleteModalRef = this.bsModalService.show(template);
  }

  confirm(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    this.warningRulesService.addWarningRule(FormUtil.getFormValue(this.dataKeys, form))
      .then(res => {
        this.getList();
        this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
        this.addModalRef.hide();
        this.addForm.reset();
      });
  }

  editConfirmation(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    this.warningRulesService.editWarningRules(form.get('id').value, FormUtil.getFormValue(this.dataKeys, form))
      .then(res => {
        this.getList();
        this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
        this.editModalRef.hide();
      });
  }

  delete(warningRule: WarningRules): void {
    this.warningRulesService.deleteWarningRules(warningRule).then(res => {
      this.getList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }

  deleteConfirmation(): void {
    this.delete(this.deleteData);
  }

  selected(warningLevel: WarningLevel): void {
    console.log(warningLevel);
    this.selectedWarningLevel = warningLevel;
  }

}
