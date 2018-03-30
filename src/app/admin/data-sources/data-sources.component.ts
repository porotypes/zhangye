import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Map } from "../../common/map";
import { DataSources } from "../../common/data-sources";
import { DataSourcesService } from "../../core/admin/data-sources.service";
import { OneMapService } from "../../core/one-map.service";
import { FormUtil } from "../../core/util/form.util";

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.css']
})
export class DataSourcesComponent implements OnInit {
  condition = {
    id: ''
  };
  hintText = '数据源(集合)';
  addForm: FormGroup;
  editForm: FormGroup;
  dataList: DataSources[];
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  mapList: Map[];
  deleteModalRef: BsModalRef;
  deleteData: DataSources;

  dataKeys = [
    { key: 'name', text: '名称', isRequired: true },
  ];
  selectedMaps: any[];
  activeMaps: any[];

  constructor(
    private dataSourcesService: DataSourcesService,
    private oneMapService: OneMapService,
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
    this.oneMapService.getOneMaps().then(mapList => this.mapList = mapList);
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, true));
  }

  populateEditForm(sources: DataSources, form: FormGroup): void {
    form.patchValue(FormUtil.populateForm(this.dataKeys, sources));
  }

  search(): void {
    if (this.condition.id === '') {
      this.getList();
      return;
    }
    this.dataSourcesService.searchSourcesList(this.condition.id).then(dataList => {
      this.dataList = dataList;
    });
  }

  getList(): void {
    this.dataSourcesService.getSourcesList().then(dataList => {
      this.dataList = dataList;
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.selectedMaps = [];
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, sources: DataSources) {
    this.selectedMaps = this.activeMaps = sources.mapList;
    this.populateEditForm(sources, this.editForm);
    this.editModalRef = this.bsModalService.show(template);
  }

  openDeleteModal(template: TemplateRef<any>, sources: DataSources) {
    this.deleteData = sources;
    this.deleteModalRef = this.bsModalService.show(template);
  }

  getMapNames(maps: Map[]): string {
    return maps.map(map => {
      return map.name;
    }).join(' , ');
  }

  addConfirmation(form: FormGroup): void {
    if (form.status === 'INVALID') {
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    const request = FormUtil.getFormValue(this.dataKeys, form);
    request['mapList'] = FormUtil.getObjArrayIds(this.selectedMaps);
    this.dataSourcesService.addSources(request).then(res => {
      if (!res) {

      }
      this.getList();
      this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
      this.addModalRef.hide();
      this.addForm.reset();
    });
  }

  editConfirmation(form: FormGroup): void {
    if (form.status === 'INVALID') {
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    const request = FormUtil.getFormValue(this.dataKeys, form);
    request['mapList'] = FormUtil.getObjArrayIds(this.selectedMaps);
    this.dataSourcesService.editSources(form.get('id').value, request).then(() => {
      this.getList();
      this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
      this.editModalRef.hide();
    });
  }

  delete(sources: DataSources): void {
    this.dataSourcesService.deleteSource(sources).then(() => {
      this.getList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }
  deleteConfirmation(): void {
    this.delete(this.deleteData);
  }

  selected(maps: Map[]): void {
    this.selectedMaps = maps;
  }
}
