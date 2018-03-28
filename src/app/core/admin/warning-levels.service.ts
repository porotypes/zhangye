import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { WarningLevel } from "../../common/warning-level";

@Injectable()
export class WarningLevelsService extends ServiceBaseService<WarningLevel> {

  getSourcesList(): Promise<WarningLevel[]> {
    return super.getAll('prewarning-levels').then(warningLevelList => {
      return warningLevelList;
    });
  }

  addWarning(request: Object): Promise<WarningLevel> {
    return super.post('prewarning-levels', request).then(warning => {
      return warning;
    });
  }

  editWarning(id: number, request: Object): Promise<WarningLevel> {
    return super.put('prewarning-levels/' + id, request).then(warning => {
      return warning;
    });
  }

  deleteWarning(warningLevel: WarningLevel): Promise<WarningLevel> {
    return super.delete('prewarning-levels/' + warningLevel.id).then(warning => {
      return warning;
    });
  }

}
