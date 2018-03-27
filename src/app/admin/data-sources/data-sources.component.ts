import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Map } from "../../common/map";
import { DataSources } from "../../common/data-sources";
import { DataSourcesService } from "../../core/admin/data-sources.service";
import { OneMapService } from "../../core/one-map.service";

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.css']
})
export class DataSourcesComponent implements OnInit {
  hintText: string = '数据源(集合)';
  addForm: FormGroup;
  editForm: FormGroup;
  dataList: DataSources[];
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  mapList: Map[];
  deleteModalRef: BsModalRef;
  deleteData: DataSources;
  editData: DataSources;

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
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      mapId: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      mapId: ['', Validators.required]
    });
  }

  populateEditForm(sources: DataSources, form: FormGroup): void {
    form.patchValue({
      id: sources.id,
      name: sources.name,
      mapId: sources.mapList[0].id
    });
  }

  getFormValue(form: FormGroup): Object {
    return {
      name: form.get('name').value,
      mapId: form.get('mapId').value,
    };
  }

  getList(): void {
    this.dataSourcesService.getSourcesList().then(dataList => {
      this.dataList = dataList;
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.editData = null;
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, sources: DataSources) {
    this.populateEditForm(sources, this.editForm);
    this.editModalRef = this.bsModalService.show(template);
  }

  openDeleteModal(template: TemplateRef<any>, sources: DataSources) {
    this.deleteData = sources;
    this.deleteModalRef = this.bsModalService.show(template);
  }

  getMapNames(maps: Map[]): string {
    return maps.map(map => { return map.name }).join();
  }

  addConfirmation(form: FormGroup): void {
    this.dataSourcesService.addSources(this.getFormValue(form)).then(res => {
      // TODO
      this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
      this.addModalRef.hide();
      console.log(res);
    });
  }

  editConfirmation(form: FormGroup): void {
    this.dataSourcesService.editSources(form.get('id').value, this.getFormValue(form)).then(res => {
      // TODO
      this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
      this.editModalRef.hide();
      console.log(res);
    });
  }

  delete(sources: DataSources): void {
    this.dataSourcesService.deleteSource(sources).then(res => {
      // TODO
      this.getList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }
  deleteConfirmation(sources: DataSources): void {
    this.delete(this.deleteData);
  }
}
