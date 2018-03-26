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

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  dataList: DataSources[];
  addModalRef: BsModalRef;
  editUserModalRef: BsModalRef;
  mapList: Map[];

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
    this.getUserList();
    this.oneMapService.getOneMaps().then(mapList => this.mapList = mapList);
  }

  private createForm(): void {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      map: ['', Validators.required]
    });
    this.editUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  populateEditUserForm(user: any, form: FormGroup): void {
    form.patchValue({
      name: user,
      map: user
    });
  }

  getUserList(): void {
    this.dataSourcesService.getSourcesList().then(dataList => {
      this.dataList = dataList;
    });
  }

  deleteUser(user: DataSources): void {
    this.dataSourcesService.delUser(user).then(res => {
      // TODO
      console.log('delete success');
    });
  }

  openAddUserModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditUserModal(template: TemplateRef<any>, user: DataSources) {
    this.populateEditUserForm(user, this.editUserForm);
    this.editUserModalRef = this.bsModalService.show(template);
  }

  getMapNames(maps: Map[]): string {
    return maps.map(map => { return map.name }).join();
  }

  addConfirmation(form: FormGroup, mapId: number): void {
    this.toastr.success('You are awesome!', 'Success!');
    this.addModalRef.hide();
    //this.dataSourcesService.addSource(form.get('name').value, mapId).then(res => {
    //  console.log(res);
    //});
  }
}
