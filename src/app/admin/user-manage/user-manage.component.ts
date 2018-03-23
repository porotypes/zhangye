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

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  userList: UserManage[];
  addUserModalRef: BsModalRef;
  editUserModalRef: BsModalRef;

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
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.editUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  populateEditUserForm(user: UserManage, form: FormGroup): void {
    form.patchValue({
      username: user.username,
      password: user.password
    });
  }

  getUserList(): void {
    this.userManageService.getUserManageList().then(userList => {
      this.userList = userList;
    });
  }

  deleteUser(user: UserManage): void {
    this.userManageService.delUser(user).then(res => {
      // TODO
      console.log('delete success');
    });
  }

  openAddUserModal(template: TemplateRef<any>) {
    this.addUserModalRef = this.bsModalService.show(template);
  }

  openEditUserModal(template: TemplateRef<any>, user: UserManage) {
    this.populateEditUserForm(user, this.editUserForm);
    this.editUserModalRef = this.bsModalService.show(template);
  }

}
