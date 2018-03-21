import { Component, OnInit } from '@angular/core';
import { OneMapService } from '../core/one-map.service';
import { Map } from '../common/map'

@Component({
  templateUrl: './oneMaps.component.html',
  styleUrls: ['./oneMaps.component.css']
})
export class OneMapsComponent implements OnInit {
  map: any;
  mapsList: any[];

  constructor(
    private oneMapService: OneMapService
  ) { }

  ngOnInit(): void {
    this.oneMapService.getOneMaps().then( maps => {
      this.mapsList = maps;
      this.createdMap(maps[0]);
    });
  }

  getMapDetails(id: number): void {
    this.oneMapService.getMapDetails(id).then( mapDetails => {
      console.log(mapDetails);
      this.createdMap(mapDetails);
    });
  }

  private createdMap(mapDetails: Map): void {
    this.map = new T.Map('map');
    this.map.centerAndZoom(new T.LngLat(mapDetails.longitude, mapDetails.latitude), mapDetails.zoomLevel);

    /* 标注物列表 */
    const markerDatas = [
      {
        data: {
          id: 1,
          name: '测试',
          value: 123
        },
        longitude: 100.450002,
        latitude: 38.930301
      },
      {
        data: {
          id: 2,
          name: '测试2',
          value: 1222
        },
        longitude: 100.441502,
        latitude: 38.921502
      },
      {
        data: {
          id: 3,
          name: '测试3',
          value: 576452
        },
        longitude: 100.431502,
        latitude: 38.931502
      }
    ];
    markerDatas.forEach( markerData => {
      this.createMarker(markerData);
    });
  }


  /*创建标注物*/
  private createMarker(markerData: Object): void {
    //创建标注对象
    let marker = new T.Marker(new T.LngLat(markerData['longitude'], markerData['latitude']));
    marker.data = markerData['data'];
    //添加标注
    this.map.addOverLay(marker);
    marker.addEventListener("click", this.markerClick);
  }

  private markerClick(e): void {
    console.log(e.target.data);
  }
}
