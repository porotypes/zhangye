import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Map } from "../../common/map";
import { OneMapService } from "../../core/one-map.service";

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

  constructor(
    private oneMapService: OneMapService,
    private bsModalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      zoomLevel: ['15'],
      priority: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      zoomLevel: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  populateEditUserForm(map: Map, form: FormGroup): void {
    form.patchValue({
      name: map.name,
      latitude: map.latitude,
      longitude: map.longitude,
      zoomLevel: map.zoomLevel,
      priority: map.priority,
      type: map.type
    });
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
      return;
    }
  }

  changeInfo(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
  }

  deleteConfirmation(template: TemplateRef<any>, map: Map): void {
    this.deleteModalRef = this.bsModalService.show(template);
    this.deleteData = map;
  }

  delete(): void {

  }

  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.bsModalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, map: Map) {
    this.editModalRef = this.bsModalService.show(template);
    this.populateEditUserForm(map, this.editForm);
  }

}
