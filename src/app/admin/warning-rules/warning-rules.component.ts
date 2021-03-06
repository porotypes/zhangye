import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { WarningRules } from "../../common/warning-rules";
import { WarningRulesService } from "../../core/admin/warning-rules.service";
import { WarningLevel } from "../../common/warning-level";
import { WarningLevelsService } from "../../core/admin/warning-levels.service";
import { TypeOfDisaster } from "../../common/type-of-disaster";
import { TypeOfDisasterService } from "../../core/admin/type-of-disaster.service";
import { DataSpot } from "../../common/data-spot";
import { DataSpotService } from "../../core/admin/data-spot.service";
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
  dataSpotList: DataSpot[];
  typeOfDisasterList: TypeOfDisaster[];

  dataKeys = [
    { key: 'name', text: '姓名', isRequired: true },
    { key: 'description', text: '描述', isRequired: false },
    { key: 'prewarningLevel', text: '预警等级', isRequired: false },
    { key: 'disaster', text: '灾害类型', isRequired: false },
    { key: 'dataColumn', text: '数据源', isRequired: false },
    { key: 'prewarningLevelId', text: '预警等级Id', isRequired: true },
    { key: 'disasterId', text: '灾害类型Id', isRequired: true },
    { key: 'dataColumnId', text: '数据源Id', isRequired: true },
    { key: 'min', text: '最小值', isRequired: true },
    { key: 'max', text: '最大值', isRequired: true },
    { key: 'unit', text: '单位', isRequired: false },
  ];

  constructor(
    private warningRulesService: WarningRulesService,
    private warningLevelsService: WarningLevelsService,
    private dataSpotService: DataSpotService,
    private typeOfDisasterService: TypeOfDisasterService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef
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

  getTypeOfDisasterList(): void {
    this.typeOfDisasterService.getDisasterList().then(list => {
      this.typeOfDisasterList = list;
    });
  }

  getDataSpotList(): void {
    this.dataSpotService.getSpotList().then(list => {
      this.dataSpotList = list;
    });
  }

  ngOnInit() {
    this.getList();
    this.getWarningLevelsList();
    this.getDataSpotList();
    this.getTypeOfDisasterList();
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, true));
  }

  populateEditForm(warningRules: WarningRules, form: FormGroup): void {
    warningRules.prewarningLevelId = warningRules.prewarningLevel.id;
    warningRules.disasterId = warningRules.disaster.id;
    warningRules.dataColumnId = warningRules.dataColumn.id;
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
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    this.warningRulesService.addWarningRule(FormUtil.getFormValue(this.dataKeys, form))
      .then(res => {
        this.getList();
        this.toastr.success(
          '保存' + this.hintText + '成功!',
          'Success!',
          {toastLife: '1000'}
        );
        this.addModalRef.hide();
        this.addForm.reset();
      });
  }

  editConfirmation(form: FormGroup): void {
    if (form.status === 'INVALID') {
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    form.value['prewarningLevel'] = { id: form.value.prewarningLevelId };
    form.value['disaster'] = { id: form.value.disasterId };
    form.value['dataColumn'] = { id: form.value.dataColumnId };
    this.warningRulesService.editWarningRules(form.get('id').value, form.value)
      .then(res => {
        this.getList();
        this.toastr.success(
          '修改' + this.hintText + '成功!',
          'Success!',
          {toastLife: '1000'}
        );
        this.editModalRef.hide();
      });
  }

  delete(warningRule: WarningRules): void {
    this.warningRulesService.deleteWarningRules(warningRule).then(res => {
      this.getList();
      this.toastr.success(
        '删除' + this.hintText + '成功!',
        'Success!',
        {toastLife: '1000'}
      );
      this.deleteModalRef.hide();
    });
  }

  deleteConfirmation(): void {
    this.delete(this.deleteData);
  }

}
