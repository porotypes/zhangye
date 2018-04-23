import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { DataSources } from "../../common/data-sources";
import { DataSpot } from "../../common/data-spot";
import { DataSourcesService } from "../../core/admin/data-sources.service";
import { DataSpotService } from "../../core/admin/data-spot.service";
import { FormUtil } from "../../core/util/form.util";

@Component({
  selector: 'app-data-spot',
  templateUrl: './data-spot.component.html',
  styleUrls: ['./data-spot.component.css']
})
export class DataSpotComponent implements OnInit {

  map: any;
  geocode: any;
  condition = {
    id: '',
    name: '',
    address: ''
  };
  hintText = '数据源(点)';
  addForm: FormGroup;
  editForm: FormGroup;
  dataList: DataSpot[];
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  deleteData: DataSpot;
  dataSourcesList: DataSources[];
  otherValue = [];
  otherValueName: string;
  otherValueContent: string;
  selectedInputSourceType: string;
  filePath = '';
  inputSource= '';
  lat: any;
  lng: any;
  address = '';

  dataKeys = [
    { key: 'name', text: '名称', isRequired: true },
    { key: 'inputType', text: '类型', isRequired: true },
    { key: 'inputSetting', text: '资源配置', isRequired: false },
    { key: 'inputSource', text: '监控值', isRequired: false },
    { key: 'longitude', text: '经度', isRequired: true },
    { key: 'latitude', text: '纬度', isRequired: true },
    { key: 'address', text: '地址', isRequired: true },
    { key: 'otherValues', text: '其他', isRequired: false },
    { key: 'dataSet', text: '数据源(集合)', isRequired: false },
    { key: 'dataSetId', text: '数据源(集合)id', isRequired: true },
  ];
  typeList = [
    { id: 0, name: '基础资源' },
    { id: 1, name: 'API' },
    { id: 2, name: '文件' },
    { id: 3, name: '手动输入' },
  ];

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

  createMap(): void {
    this.map = new T.Map('map');
    this.map.centerAndZoom(new T.LngLat(100.44388, 38.91935), 10);
    this.geocode = new T.Geocoder();
    this.map.addEventListener("click", this.selectLatAndLon.bind(this));
  }

  selectLatAndLon(e): void {
    this.map.clearOverLays();
    this.lng = e.lnglat.getLng();
    this.lat = e.lnglat.getLat();
    // 创建标注对象
    const marker = new T.Marker(new T.LngLat(this.lng, this.lat));
    // 添加标注
    this.map.addOverLay(marker);
    this.geocode.getLocation(e.lnglat, this.transferAddress.bind(this));
  }

  transferAddress(res): void {
    if (res.getStatus() === 0) {
      this.address = res.getAddress();
    }
  }

  private createForm(): void {
    this.addForm = this.fb.group(FormUtil.setControl(this.dataKeys, false));
    this.editForm = this.fb.group(FormUtil.setControl(this.dataKeys, true));
  }

  populateEditForm(dataSpot: DataSpot, form: FormGroup): void {
    dataSpot.dataSetId = dataSpot.dataSet.id;
    this.getOtherValues(dataSpot);
    this.selectedInputSourceType = dataSpot.inputType + '';
    this.getFilePath(dataSpot);
    this.getCurrentInputSource(dataSpot);
    this.getLngLatAndAddress(dataSpot);
    form.patchValue(FormUtil.populateForm(this.dataKeys, dataSpot));
  }

  // 获取文件路径
  getFilePath(dataSpot: DataSpot): void {
    this.filePath = dataSpot.inputType === 2 ? JSON.parse(dataSpot.inputSetting)['filePath'] : '';
  }

  // 获取当前监控的值
  getCurrentInputSource(dataSpot: DataSpot): void {
    const inputSourceArr = dataSpot.inputSource.split(",");
    this.inputSource = inputSourceArr[inputSourceArr.length - 1];
  }

  // 获取经纬度，地址
  getLngLatAndAddress(dataSpot: DataSpot): void {
    this.lng = dataSpot.longitude;
    this.lat = dataSpot.latitude;
    this.address = dataSpot.address;
  }

  // 获取其他详细信息
  getOtherValues(dataSpot: DataSpot): void {
    this.otherValue = dataSpot.otherValues ? JSON.parse(dataSpot.otherValues) : [];
  }

  search(): void {
    if (this.condition.id === '') {
      this.getList();
      return;
    }
    this.dataSpotService.searchSpotList(this.condition.id).then(dataList => {
      this.dataList = dataList;
    });
  }

  otherSearch(): void {
    this.condition.id = '';
    this.dataSpotService.otherSearchSpotList(this.condition.name, this.condition.address).then(dataList => {
      this.dataList = dataList;
    });
  }

  getList(): void {
    this.dataSpotService.getSpotList().then(dataList => {
      this.dataList = dataList;
    });
  }

  openAddModal(template: TemplateRef<any>) {
    this.otherValue = [];
    this.addModalRef = this.bsModalService.show(template, {keyboard: false, backdrop: 'static'});
    this.createMap();
  }

  closeAddModal(): void {
    this.addModalRef.hide();
    this.resetData();
  }

  openEditModal(template: TemplateRef<any>, dataSpot: DataSpot) {
    this.populateEditForm(dataSpot, this.editForm);
    this.editModalRef = this.bsModalService.show(template, {keyboard: false, backdrop: 'static'});
    this.createMap();
  }

  closeEditModal(): void {
    this.editModalRef.hide();
    this.resetData();
  }

  openDeleteModal(template: TemplateRef<any>, dataSpot: DataSpot) {
    this.deleteData = dataSpot;
    this.deleteModalRef = this.bsModalService.show(template);
  }

  addConfirmation(form: FormGroup): void {
    if (form.status === 'INVALID') {
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    form.value['otherValues'] = JSON.stringify(this.otherValue);
    form.value['inputSetting'] = JSON.stringify({ filePath: this.filePath });
    this.dataSpotService.addSpot(form.value).then(() => {
      this.search();
      this.toastr.success(
        '保存' + this.hintText + '成功!',
        'Success!',
        {toastLife: '1000'}
      );
      this.addModalRef.hide();
      this.addForm.reset();
      this.resetData();
    });
  }

  editConfirmation(form: FormGroup): void {
    if (form.status === 'INVALID') {
      this.toastr.warning('请填写' + FormUtil.formValidator(this.dataKeys, form));
      return;
    }
    form.value['dataSet'] = { id: form.value.dataSetId };
    form.value['otherValues'] = JSON.stringify(this.otherValue);
    form.value['inputSetting'] = JSON.stringify({ filePath: this.filePath });
    this.dataSpotService.editSpot(form.get('id').value, form.value).then(() => {
      this.search();
      this.toastr.success(
        '修改' + this.hintText + '成功!',
        'Success!',
        {toastLife: '1000'}
      );
      this.editModalRef.hide();
      this.resetData();
    });
  }

  resetData(): void {
    this.filePath = '';
    this.lng = '';
    this.lat = '';
    this.address = '';
  }

  delete(dataSpot: DataSpot): void {
    this.dataSpotService.deleteSpot(dataSpot).then(() => {
      this.getList();
      this.toastr.success(
        '删除' + this.hintText + '成功!',
        'Success!',
        {toastLife: '1000'}
      );
      this.deleteModalRef.hide();
    });
  }

  deleteConfirmation(): void {
    this.delete(this.deleteData);
  }

  pushOtherValue(): void {
    if (!this.otherValueName || !this.otherValueContent) {
      this.toastr.warning('请填写内容');
      return;
    }
    this.otherValue.push({name: this.otherValueName, value: this.otherValueContent});
    this.otherValueName = this.otherValueContent = '';
  }

  removeOtherValueItem(item: any): void {
    const index = this.otherValue.indexOf(item);
    if (index > -1) {
      this.otherValue.splice(index, 1);
    }
  }

  // 选择数据来源类型显示对应的输入框
  selectedType(event: any): void {
    this.selectedInputSourceType = event.target.value;
    this.filePath = '';
    this.inputSource = '';
    // 修改inputSetting是否为必填
    this.dataKeys.forEach(key => {
      if (key.key === 'inputSetting') {
        key.isRequired = false;
        return;
      }
    });
    if (this.selectedInputSourceType === '2') {
      this.dataKeys.forEach(key => {
        if (key.key === 'inputSetting') {
          key.isRequired = true;
          return;
        }
      });
    }
  }
}
