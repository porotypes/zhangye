import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Map } from "../../common/map";
import { OneMapService } from "../../core/one-map.service";
import { FormUtil } from "../../core/util/form.util";

@Component({
  selector: 'app-one-maps',
  templateUrl: './one-maps.component.html',
  styleUrls: ['./one-maps.component.css']
})
export class OneMapsComponent implements OnInit {

  hintText = '一张图';
  addForm: FormGroup;
  editForm: FormGroup;
  oneMapsList: Map[];
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  deleteData: Map;

  dataKeys = [
    { key: 'name', text: '名称', isRequired: true },
    { key: 'latitude', text: '纬度', isRequired: true },
    { key: 'longitude', text: '经度', isRequired: true },
    { key: 'zoomLevel', text: '缩放等级', isRequired: false },
    { key: 'priority', text: '优先级', isRequired: true },
    // { key: 'type', text: '类型', isRequired: false },
  ];

  constructor(
    private oneMapService: OneMapService,
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

  populateEditUserForm(map: Map, form: FormGroup): void {
    form.patchValue(FormUtil.populateForm(this.dataKeys, map));
  }

  getOneMapsList(): void {
    this.oneMapService.getOneMaps().then(list => {
      this.oneMapsList = list;
    });
  }

  ngOnInit() {
    this.getOneMapsList();
  }

  confirm(form: FormGroup): void {
    if (form.status === 'INVALID') {
      console.log(FormUtil.getFormValue(this.dataKeys, form))
      return;
    }
    this.oneMapService.createMap(FormUtil.getFormValue(this.dataKeys, form)).then(res => {
      this.getOneMapsList();
      this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
      this.addModalRef.hide();
      this.addForm.reset();
    });
  }

  changeInfo(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    this.oneMapService.changeMap(form.get('id').value, FormUtil.getFormValue(this.dataKeys, form))
      .then(res => {
        this.getOneMapsList();
        this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
        this.editModalRef.hide();
      });
  }

  deleteConfirmation(template: TemplateRef<any>, map: Map): void {
    this.deleteModalRef = this.bsModalService.show(template);
    this.deleteData = map;
  }

  delete(): void {
    this.oneMapService.delMap(this.deleteData).then(res => {
      this.getOneMapsList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, map: Map) {
    this.editModalRef = this.bsModalService.show(template);
    this.populateEditUserForm(map, this.editForm);
  }

}
