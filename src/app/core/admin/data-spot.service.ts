import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { DataSpot } from "../../common/data-spot";

@Injectable()
export class DataSpotService extends ServiceBaseService<DataSpot> {

  getSourcesList(): Promise<DataSpot[]> {
    return super.getAll('data-columns').then(dataSpotList => {
      return dataSpotList;
    });
  }

  addSources(request: Object): Promise<DataSpot> {
    return super.post('data-columns', request).then(dataSpot => {
      return dataSpot;
    });
  }

  editSources(id: number, request: Object): Promise<DataSpot> {
    return super.patch('data-columns/' + id, request).then(dataSpot => {
      return dataSpot;
    });
  }

  deleteSource(dataSpot: DataSpot): Promise<DataSpot> {
    return super.delete('data-columns/' + dataSpot.id).then(dataSpot => {
      return dataSpot;
    });
  }

}
