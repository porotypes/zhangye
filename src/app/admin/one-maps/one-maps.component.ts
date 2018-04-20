import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Map } from "../../common/map";
import { OneMapCategories } from "../../common/one-map-categories";
import { OneMapService } from "../../core/one-map.service";
import { OneMapCategoriesService } from "../../core/admin/one-map-categories.service";
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
  oneMapCategoriesList: OneMapCategories[];
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  deleteData: Map;
  selectedCate: any[];
  activeOneMapCategories: any[];

  dataKeys = [
    { key: 'name', text: '名称', isRequired: true },
    { key: 'latitude', text: '纬度', isRequired: true },
    { key: 'longitude', text: '经度', isRequired: true },
    { key: 'zoomLevel', text: '缩放等级', isRequired: false },
    { key: 'priority', text: '优先级', isRequired: true },
    { key: 'categoryList', text: '分类', isRequired: false }
  ];

  constructor(
    private oneMapService: OneMapService,
    private oneMapCategoriesService: OneMapCategoriesService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef
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

  getOneMapCategoriesList(): void {
    this.oneMapCategoriesService.getOneMapCategoriesList().then(list => {
      this.oneMapCategoriesList = list;
    });
  }

  ngOnInit() {
    this.getOneMapsList();
    this.getOneMapCategoriesList();
  }

  confirm(form: FormGroup): void {
    if (form.status === 'INVALID') {
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    const request = FormUtil.getFormValue(this.dataKeys, form);
    request['categoryList'] = FormUtil.getObjArrayIds(this.selectedCate);
    this.oneMapService.createMap(request).then(res => {
      this.getOneMapsList();
      this.toastr.success(
        '保存' + this.hintText + '成功!',
        'Success!',
        {toastLife: '1000'}
      );
      this.addModalRef.hide();
      this.addForm.reset();
    });
  }

  changeInfo(form: FormGroup): void {
    if (form.status === 'INVALID') {
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    const request = FormUtil.getFormValue(this.dataKeys, form);
    request['categoryList'] = FormUtil.getObjArrayIds(this.selectedCate);
    this.oneMapService.changeMap(form.get('id').value, request)
      .then(res => {
        this.getOneMapsList();
        this.toastr.success(
          '修改' + this.hintText + '成功!',
          'Success!',
          {toastLife: '1000'}
        );
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
      this.toastr.success(
        '删除' + this.hintText + '成功!',
        'Success!',
        {toastLife: '1000'}
      );
      this.deleteModalRef.hide();
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, map: Map) {
    this.selectedCate = this.activeOneMapCategories = map.categoryList;
    this.editModalRef = this.bsModalService.show(template);
    this.populateEditUserForm(map, this.editForm);
  }

  selected(oneMapCategories: OneMapCategories[]): void {
    this.selectedCate = oneMapCategories;
  }

}
