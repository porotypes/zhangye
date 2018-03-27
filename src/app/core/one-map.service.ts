import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';
import { Map } from '../common/map';

@Injectable()
export class OneMapService extends ServiceBaseService<Map> {

  getOneMaps(): Promise<Map[]> {
    return super.getAll('onemaps').then( maps => {
      return maps;
    } );
  }

  getMapDetails(id: number): Promise<Map> {
    return super.get('onemaps/' + id).then( map => {
      return map;
    } );
  }

  createMap(map: object): Promise<Map> {
    return super.post('onemaps/', map).then(map => {
      return map;
    });
  }

  changeMap(id: number, map: object): Promise<Map> {
    return super.put('onemaps/' + id, map).then(map => {
      return map;
    });
  }

  delMap(map: Map): Promise<any> {
    const url = 'onemaps/' + map.id;
    return super.delete(url).then(res => {
      return res;
    });
  }

}
