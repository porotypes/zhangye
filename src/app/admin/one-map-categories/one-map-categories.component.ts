import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { OneMapCategories } from "../../common/one-map-categories";
import { OneMapCategoriesService } from "../../core/admin/one-map-categories.service";
import { FormUtil } from "../../core/util/form.util";

@Component({
  selector: 'app-one-map-categories',
  templateUrl: './one-map-categories.component.html',
  styleUrls: ['./one-map-categories.component.css']
})
export class OneMapCategoriesComponent implements OnInit {

  hintText = '一张图分类';
  oneMapCategoriesList: OneMapCategories[];
  addForm: FormGroup;
  editForm: FormGroup;
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  deleteData: OneMapCategories;

  dataKeys = [
    { key: 'name', text: '名称', isRequired: true },
    { key: 'content', text: '内容', isRequired: false },
    { key: 'priority', text: '优先级', isRequired: false },
  ];

  constructor(
    private oneMapCategoriesService: OneMapCategoriesService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getOneMapCategoriesList();
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, true));
  }

  populateEditForm(oneMapCategories: OneMapCategories, form: FormGroup): void {
    form.patchValue(FormUtil.populateForm(this.dataKeys, oneMapCategories));
  }

  getOneMapCategoriesList(): void {
    this.oneMapCategoriesService.getOneMapCategoriesList().then(list => {
      this.oneMapCategoriesList = list;
    });
  }

  confirm(form: FormGroup): void {
    if (form.status === 'INVALID') {
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    this.oneMapCategoriesService.addOneMapCategories(FormUtil.getFormValue(this.dataKeys, form))
      .then(res => {
        this.getOneMapCategoriesList();
        this.oneMapCategoriesService.updateOneMapCate.emit();
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
    this.oneMapCategoriesService.editOneMapCategories(form.get('id').value, form.value)
      .then(res => {
        this.getOneMapCategoriesList();
        this.toastr.success(
          '修改' + this.hintText + '成功!',
          'Success!',
          {toastLife: '1000'}
        );
        this.editModalRef.hide();
      });
  }

  delete(): void {
    this.oneMapCategoriesService.deleteOneMapCategories(this.deleteData).then(res => {
      this.getOneMapCategoriesList();
      this.oneMapCategoriesService.updateOneMapCate.emit();
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

  openEditModal(template: TemplateRef<any>, oneMapCategories: OneMapCategories) {
    this.populateEditForm(oneMapCategories, this.editForm);
    this.editModalRef = this.bsModalService.show(template);
  }

  openDeleteModal(template: TemplateRef<any>, oneMapCategories: OneMapCategories) {
    this.deleteData = oneMapCategories;
    this.deleteModalRef = this.bsModalService.show(template);
  }
}
