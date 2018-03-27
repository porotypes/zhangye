import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { TypeOfDisaster } from "../../common/type-of-disaster";

@Injectable()
export class TypeOfDisasterService extends ServiceBaseService<TypeOfDisaster> {

  getDisasterList(): Promise<TypeOfDisaster[]> {
    const url = 'natural-disasters';
    return super.getAll(url).then(list => {
      return list;
    });
  }

  addDisaster(disaster: object): Promise<TypeOfDisaster> {
    return super.post('natural-disasters', disaster).then(disaster => {
      return disaster;
    });
  }

  changeDisaster(id: number, disaster: object): Promise<TypeOfDisaster> {
    return super.put('natural-disasters/' + id, disaster).then(disaster => {
      return disaster;
    });
  }

  deleteDisaster(disaster: TypeOfDisaster): Promise<TypeOfDisaster> {
    return super.delete('natural-disasters/' + disaster.id).then(disaster => {
      return disaster;
    });
  }
}
