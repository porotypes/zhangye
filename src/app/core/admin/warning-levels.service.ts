import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { WarningLevel } from "../../common/warning-level";

@Injectable()
export class WarningLevelsService extends ServiceBaseService<WarningLevel> {

  getSourcesList(): Promise<WarningLevel[]> {
    return super.getAll('prewarning-levels').then(WarningLevelList => {
      return WarningLevelList;
    });
  }

  addSources(request: Object): Promise<WarningLevel> {
    return super.post('prewarning-levels', request).then(WarningLevel => {
      return WarningLevel;
    });
  }

  editSources(id: number, request: Object): Promise<WarningLevel> {
    return super.patch('prewarning-levels/' + id, request).then(WarningLevel => {
      return WarningLevel;
    });
  }

  deleteSource(warningLevel: WarningLevel): Promise<WarningLevel> {
    return super.delete('prewarning-levels/' + warningLevel.id).then(WarningLevel => {
      return WarningLevel;
    });
  }

}
