import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Map } from '../common/map';
import { OneMapService } from '../core/one-map.service';
import { OneMapCategoriesService } from "../core/admin/one-map-categories.service";

@Component({
  templateUrl: './oneMaps.component.html',
  styleUrls: ['./oneMaps.component.css']
})
export class OneMapsComponent implements OnInit, OnDestroy {
  map: any;
  mapsList: Map[];
  mapsListName: string;
  selectedMapId: number;
  sub: any;

  constructor(
    private oneMapService: OneMapService,
    private oneMapCategoriesService: OneMapCategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.map = new T.Map('map');
    this.getOneMapList();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getOneMapList(): void {
    this.sub = this.route.queryParams.subscribe(queryParams => {
      const id = queryParams.cateId;

      this.oneMapCategoriesService.getOneMapCategories(id).then(mapCate => {
        this.mapsList = mapCate.mapList;
        this.mapsListName = mapCate.name;
        this.selectedMapId = mapCate.mapList[0].id;
        this.getMapDetail(mapCate.mapList[0].id);
        this.map.addEventListener("click", this.MapClick);
      });
    });
  }

  getMapDetail(id: number): void {
    this.oneMapService.getMapDetails(id).then(map => {
      this.selectedMapId = id;
      this.createdMap(map);
    });
  }

  MapClick(e): void {
    // console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
  }

  private createdMap(mapDetails: Map): void {
    this.map.clearOverLays();
    this.map.centerAndZoom(new T.LngLat(mapDetails.longitude, mapDetails.latitude), mapDetails.zoomLevel);
    // 标注物列表
    if (mapDetails['setList'].length > 0) {
      const markerDatas = mapDetails['setList'][0].columnList.map(item => {
        return {
          data: {
            id: item.id,
            name: item.name,
            inputType: item.inputType,
            inputSource: item.inputSource.split(',')[item.inputSource.split(',').length - 1],
            otherValues: item.otherValues
          },
          longitude: item.longitude,
          latitude: item.latitude
        };
      });
      markerDatas.forEach( markerData => {
        this.createMarker(markerData);
      });
    }
  }


  // 创建标注物
  private createMarker(markerData: Object): void {
    // 创建标注对象
    const marker = new T.Marker(new T.LngLat(markerData['longitude'], markerData['latitude']));
    marker.data = markerData['data'];
    // 添加标注
    this.map.addOverLay(marker);
    marker.addEventListener("click", this.markerClick);
    const markerInfoWin = new T.InfoWindow();
    markerInfoWin.setContent(this.deCodeOtherValues(marker.data));
    marker.addEventListener("click", function () {
      marker.openInfoWindow(markerInfoWin);
    });
  }

  // 解析otherValues的数据，返回html模板
  private deCodeOtherValues(markerData: Object): Element {
    const otherValuesList = document.createElement('div');
    otherValuesList.innerHTML = `名称：${markerData['name']}`;
    if (markerData['inputType'] !== 0) {
      const inputSourceEl = document.createElement('div');
      inputSourceEl.innerHTML = `当前监控值：${markerData['inputSource']}`;
      otherValuesList.appendChild(inputSourceEl);
    }
    if (markerData['otherValues']) {
      const otherValues = JSON.parse(markerData['otherValues']);
      otherValues.forEach(item => {
        const childEl = document.createElement('div');
        childEl.innerHTML = `${item['name']}：${item['value']}`;
        otherValuesList.appendChild(childEl);
      });
    }
    return otherValuesList;
  }

  private markerClick(e): void {
    // console.log(e.target.data);
  }
}
