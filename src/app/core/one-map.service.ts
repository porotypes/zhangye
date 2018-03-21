import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';
import { Map } from '../common/map'

@Injectable()
export class OneMapService extends ServiceBaseService<Map> {

  getOneMaps(): Promise<Map[]> {
    return super.getAll('onemaps').then( maps => { return maps } );
  }

  getMapDetails(id: number): Promise<Map> {
    return super.get('onemaps/' + id).then( map => { return map } );
  }

}
