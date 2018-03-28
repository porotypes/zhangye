import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserManage } from "../../common/user-manage";
import { UserManageService } from "../../core/admin/user-manage.service";
import { FormUtil } from "../../core/util/form.util";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  hintText = '用户';
  addForm: FormGroup;
  editForm: FormGroup;
  userList: UserManage[];
  deleteUserData: UserManage;
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;

  dataKeys = [
    { key: 'username', text: '姓名', isRequired: true },
    { key: 'password', text: '密码', isRequired: true },
  ];

  editDataKeys = [
    { key: 'username', text: '姓名', isRequired: true },
    { key: 'password', text: '密码', isRequired: false },
  ];

  constructor(
    private userManageService: UserManageService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getUserList();
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.editDataKeys, true));
  }

  populateEditUserForm(user: UserManage, form: FormGroup): void {
    form.patchValue(FormUtil.populateForm(this.editDataKeys, user));
  }

  getUserList(): void {
    this.userManageService.getUserManageList().then(userList => {
      this.userList = userList;
    });
  }

  confirm(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    this.userManageService.addUser(FormUtil.getFormValue(this.dataKeys, form)).then(res => {
      this.getUserList();
      this.toastr.success('新增' + this.hintText + '成功!', 'Success!');
      this.addModalRef.hide();
      this.addForm.reset();
    });
  }

  changeInfo(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    this.userManageService.changeUser(form.get('id').value, FormUtil.getFormValue(this.editDataKeys, form))
      .then(res => {
        this.getUserList();
        this.toastr.success('修改' + this.hintText + '成功!', 'Success!');
        this.editModalRef.hide();
      });
  }

  deleteConfirmation(user: UserManage, template: TemplateRef<any>): void {
    this.deleteModalRef = this.bsModalService.show(template);
    this.deleteUserData = user;
  }

  delete(): void {
    this.userManageService.delUser(this.deleteUserData).then(res => {
      this.getUserList();
      this.toastr.success('删除' + this.hintText + '成功!', 'Success!');
      this.deleteModalRef.hide();
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, user: UserManage) {
    this.populateEditUserForm(user, this.editForm);
    this.editModalRef = this.bsModalService.show(template);
  }

}
