import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Map } from "../../common/map";
import { DataSources } from "../../common/data-sources";
import { DataSpot } from "../../common/data-spot";
import { DataSourcesService } from "../../core/admin/data-sources.service";
import { DataSpotService } from "../../core/admin/data-spot.service";

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
  editData: DataSpot;
  dataSourcesList: DataSources[];

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
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      source: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      address: ['', Validators.required],
      setId: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      source: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      address: ['', Validators.required],
      setId: ['', Validators.required]
    });
  }

  populateEditForm(data: DataSpot, form: FormGroup): void {
    form.patchValue({
      id: data.id,
      name: data.name,
      type: data.inputType,
      source: data.inputSource,
      longitude: data.longitude,
      latitude: data.latitude,
      address: data.address,
      setId: data.dataSet.id
    });
  }

  getFormValue(form: FormGroup): Object {
    return {
      name: form.get('name').value,
      type: form.get('type').value,
      source: form.get('source').value,
      longitude: form.get('longitude').value,
      latitude: form.get('latitude').value,
      address: form.get('address').value,
      setId: form.get('setId').value
    }
  }

  getList(): void {
    this.dataSpotService.getSourcesList().then(dataList => {
      this.dataList = dataList;
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.editData = null;
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
    this.dataSpotService.addSources(this.getFormValue(form)).then(res => {
      // TODO
      this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
      this.addModalRef.hide();
      console.log(res);
    });
  }

  editConfirmation(form: FormGroup): void {
    this.dataSpotService.editSources(form.get('id').value, this.getFormValue(form)).then(res => {
      // TODO
      this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
      this.editModalRef.hide();
      console.log(res);
    });
  }

  delete(dataSpot: DataSpot): void {
    this.dataSpotService.deleteSource(dataSpot).then(res => {
      // TODO
      this.getList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }
  deleteConfirmation(dataSpot: DataSpot): void {
    this.delete(this.deleteData);
  }
}
