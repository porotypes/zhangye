import { Component, OnInit } from '@angular/core';
import { OneMapService } from '../core/one-map.service';
import { Map } from '../common/map';

@Component({
  templateUrl: './oneMaps.component.html',
  styleUrls: ['./oneMaps.component.css']
})
export class OneMapsComponent implements OnInit {
  map: any;
  mapsList: Map[];
  selectedMapId: number;

  constructor(
    private oneMapService: OneMapService
  ) { }

  ngOnInit(): void {
    this.map = new T.Map('map');
    this.oneMapService.getOneMaps().then( maps => {
      this.mapsList = maps;
      this.selectedMapId = maps[0].id;
      this.createdMap(maps[0]);
      this.map.addEventListener("click", this.MapClick);
    });
  }

  getMapDetails(id: number): void {
    this.selectedMapId = id;
    this.oneMapService.getMapDetails(id).then( mapDetails => {
      this.createdMap(mapDetails);
    });
  }

  MapClick(e): void {
    console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
  }

  private createdMap(mapDetails: Map): void {
    this.map.clearOverLays();
    this.map.centerAndZoom(new T.LngLat(mapDetails.longitude, mapDetails.latitude), mapDetails.zoomLevel);
    /* 标注物列表 */
    if (mapDetails['setList'].length > 0) {
      const markerDatas = mapDetails['setList'][0].columnList.map(item => {
        return {
          data: {
            id: item.id,
            name: item.name,
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


  /*创建标注物*/
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
    // TODO modify judgment condition
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
    console.log(e.target.data);
  }
}
