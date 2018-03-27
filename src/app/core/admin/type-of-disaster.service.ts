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

}
