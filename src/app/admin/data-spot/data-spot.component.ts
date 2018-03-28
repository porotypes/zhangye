import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { DataSources } from "../../common/data-sources";
import { DataSpot } from "../../common/data-spot";
import { DataSourcesService } from "../../core/admin/data-sources.service";
import { DataSpotService } from "../../core/admin/data-spot.service";
import { FormUtil } from "../../core/util/form.util";

@Component({
  selector: 'app-data-spot',
  templateUrl: './data-spot.component.html',
  styleUrls: ['./data-spot.component.css']
})
export class DataSpotComponent implements OnInit {
  hintText: string = '数据源(点)';
  addForm: FormGroup;
  editForm: FormGroup;
  dataList: DataSpot[];
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  deleteData: DataSpot;
  dataSourcesList: DataSources[];

  dataKeys = [
    { key: 'name', text: '名称', isRequired: true },
    { key: 'inputType', text: '类型', isRequired: true },
    { key: 'inputSetting', text: '资源配置', isRequired: true },
    { key: 'inputSource', text: '资源', isRequired: true },
    { key: 'longitude', text: '经度', isRequired: true },
    { key: 'latitude', text: '纬度', isRequired: true },
    { key: 'address', text: '地址', isRequired: true },
    { key: 'otherValues', text: '其他', isRequired: true },
    { key: 'dataSet', text: '数据源(集合)', isRequired: true },
    { key: 'dataSetId', text: '数据源(集合)id', isRequired: true },
  ];

  constructor(
    private dataSourcesService: DataSourcesService,
    private dataSpotService: DataSpotService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.dataSourcesService.getSourcesList().then(dataList => {
      this.dataSourcesList = dataList;
    });
    this.getList();
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
  }

  populateEditForm(dataSpot: DataSpot, form: FormGroup): void {
    dataSpot.dataSetId = dataSpot.dataSet.id;
    form.patchValue(FormUtil.populateForm(this.dataKeys, dataSpot));
  }

  getList(): void {
    this.dataSpotService.getSpotList().then(dataList => {
      this.dataList = dataList;
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, dataSpot: DataSpot) {
    console.log(dataSpot);
    this.populateEditForm(dataSpot, this.editForm);
    this.editModalRef = this.bsModalService.show(template);
  }

  openDeleteModal(template: TemplateRef<any>, dataSpot: DataSpot) {
    this.deleteData = dataSpot;
    this.deleteModalRef = this.bsModalService.show(template);
  }

  addConfirmation(form: FormGroup): void {
    this.dataSpotService.addSpot(FormUtil.getFormValue(this.dataKeys, form)).then(res => {
      this.getList();
      this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
      this.addModalRef.hide();
    });
  }

  editConfirmation(form: FormGroup): void {
    this.dataSpotService.editSpot(form.get('id').value, FormUtil.getFormValue(this.dataKeys, form)).then(res => {
      this.getList();
      this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
      this.editModalRef.hide();
    });
  }

  delete(dataSpot: DataSpot): void {
    this.dataSpotService.deleteSpot(dataSpot).then(res => {
      this.getList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }
  deleteConfirmation(): void {
    this.delete(this.deleteData);
  }
}
