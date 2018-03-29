import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { DataSpot } from "../../common/data-spot";

@Injectable()
export class DataSpotService extends ServiceBaseService<DataSpot> {

  getSpotList(): Promise<DataSpot[]> {
    return super.getAll('data-columns').then(dataSpotList => {
      return dataSpotList;
    });
  }

  addSpot(request: any): Promise<DataSpot> {
    request['dataSet'] = { id: request.dataSetId };
    return super.post('data-columns', request).then(dataSpot => {
      return dataSpot;
    });
  }

  editSpot(id: number, request: Object): Promise<DataSpot> {
    return super.put('data-columns/' + id, request).then(dataSpot => {
      return dataSpot;
    });
  }

  deleteSpot(dataSpot: DataSpot): Promise<DataSpot> {
    return super.delete('data-columns/' + dataSpot.id).then(dataSpot => {
      return dataSpot;
    });
  }

  searchSpotList(id: string): Promise<DataSpot[]> {
    return super.getAll('data-columns/findbysetid?setId=' + id).then(dataSpotList => {
      return dataSpotList;
    });
  }

  otherSearchSpotList(name: string, address: string): Promise<DataSpot[]> {
    return super.getAll('data-columns/findByName?name=' + name + '&address=' + address).then(dataSpotList => {
      return dataSpotList;
    });
  }
}
