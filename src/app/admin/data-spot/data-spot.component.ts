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
  condition = {
    id: '',
    name: '',
    address: ''
  };
  hintText = '数据源(点)';
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
    { key: 'dataSet', text: '数据源(集合)', isRequired: false },
    { key: 'dataSetId', text: '数据源(集合)id', isRequired: true },
  ];
  typeList = [
    { id: 1, name: 'API' },
    { id: 2, name: '文件' },
    { id: 3, name: '手动输入' },
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
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, true));
  }

  populateEditForm(dataSpot: DataSpot, form: FormGroup): void {
    dataSpot.dataSetId = dataSpot.dataSet.id;
    form.patchValue(FormUtil.populateForm(this.dataKeys, dataSpot));
  }

  search(): void {
    if (this.condition.id == '') {
      this.getList();
      return;
    }
    this.dataSpotService.searchSpotList(this.condition.id).then(dataList => {
      this.dataList = dataList;
    });
  }

  otherSearch(): void {
    this.condition.id = '';
    this.dataSpotService.otherSearchSpotList(this.condition.name, this.condition.address).then(dataList => {
      this.dataList = dataList;
    });
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

  getRequestData(form: FormGroup): any {
    if (form.status === 'INVALID') {
      this.toastr.info('请完善提交数据', '缺少参数!');
      return null;
    }
    const request = FormUtil.getFormValue(this.dataKeys, form);
    return request;
  }

  addConfirmation(form: FormGroup): void {
    const request = this.getRequestData(form);
    if (!request) {
      return;
    }
    this.dataSpotService.addSpot(request).then(() => {
      this.getList();
      this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
      this.addModalRef.hide();
      this.addForm.reset();
    });
  }

  editConfirmation(form: FormGroup): void {
    const request = this.getRequestData(form);
    if (!request) {
      return;
    }
    form.value['dataSet'] = { id: form.value.dataSetId };
    this.dataSpotService.editSpot(form.get('id').value, form.value).then(() => {
      this.getList();
      this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
      this.editModalRef.hide();
    });
  }

  delete(dataSpot: DataSpot): void {
    this.dataSpotService.deleteSpot(dataSpot).then(() => {
      this.getList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }
  deleteConfirmation(): void {
    this.delete(this.deleteData);
  }
}
