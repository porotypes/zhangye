import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { UserManage } from "../../common/user-manage";
import { UserManageService } from "../../core/admin/user-manage.service";

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
  user: UserManage;
  deleteUserData: UserManage;
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;

  constructor(
    private userManageService: UserManageService,
    private bsModalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getUserList();
  }

  private createForm(): void {
    this.addForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      password: ['']
    });
  }

  populateEditUserForm(user: UserManage, form: FormGroup): void {
    form.patchValue({
      username: user.username,
      password: user.password
    });
  }

  populateAddUserObj(user: UserManage, form: FormGroup): void {
    user.username = form.get('username').value;
    user.password = form.get('password').value;
  }

  populateEditUserObj(user: UserManage, form: FormGroup): void {
    user.username = form.get('username').value;
    user.password = form.get('password').value;
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
    if (!this.user) {
      this.user = new UserManage;
    }
    this.populateAddUserObj(this.user, form);
    this.userManageService.addUser(this.user).then(res => {
      console.log(res);
    });
  }

  changeInfo(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    if (!this.user) {
      this.user = new UserManage;
    }
    this.populateEditUserObj(this.user, form);
    this.userManageService.changeUser(this.user).then(res => {
      console.log(res);
    });
  }

  deleteConfirmation(user: UserManage, template: TemplateRef<any>): void {
    this.deleteModalRef = this.bsModalService.show(template);
    this.deleteUserData = user;
  }

  delete(): void {
    this.userManageService.delUser(this.deleteUserData).then(res => {
      console.log(res);
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
