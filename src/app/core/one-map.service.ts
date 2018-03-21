import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';

@Injectable()
export class OneMapService extends ServiceBaseService<any> {

  getOneMaps(): Promise<any> {
    return super.get('onemaps').then( maps => { return maps } );
  }

}
