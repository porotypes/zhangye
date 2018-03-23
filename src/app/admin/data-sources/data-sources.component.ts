import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Map } from "../../common/map";
import { DataSources } from "../../common/data-sources";
import { DataSourcesService } from "../../core/admin/data-sources.service";

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.css']
})
export class DataSourcesComponent implements OnInit {

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  dataList: DataSources[];
  addUserModalRef: BsModalRef;
  editUserModalRef: BsModalRef;

  constructor(
    private userManageService: DataSourcesService,
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

  populateEditUserForm(user: DataSources, form: FormGroup): void {
    form.patchValue({

    });
  }

  getUserList(): void {
    this.userManageService.getSourcesList().then(dataList => {
      this.dataList = dataList;
    });
  }

  deleteUser(user: DataSources): void {
    this.userManageService.delUser(user).then(res => {
      // TODO
      console.log('delete success');
    });
  }

  openAddUserModal(template: TemplateRef<any>) {
    this.addUserModalRef = this.bsModalService.show(template);
  }

  openEditUserModal(template: TemplateRef<any>, user: DataSources) {
    this.populateEditUserForm(user, this.editUserForm);
    this.editUserModalRef = this.bsModalService.show(template);
  }

  getMapNames(maps: Map[]): string {
    return maps.map(map => { return map.name }).join();
  }
}
