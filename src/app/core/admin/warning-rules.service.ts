import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { WarningRules } from "../../common/warning-rules";

@Injectable()
export class WarningRulesService extends ServiceBaseService<WarningRules> {

  getWarningRulesList(): Promise<WarningRules[]> {
    return super.getAll('prewarning-rules').then(warningLevelList => {
      return warningLevelList;
    });
  }

  addWarningRule(request: any): Promise<WarningRules> {
    request['prewarningLevel'] = { id: request.prewarningLevelId };
    request['disaster'] = { id: request.disasterId };
    request['dataColumn'] = { id: request.dataColumnId };
    return super.post('prewarning-rules', request).then(warning => {
      return warning;
    });
  }

  editWarningRules(id: number, request: Object): Promise<WarningRules> {
    return super.put('prewarning-rules/' + id, request).then(warning => {
      return warning;
    });
  }

  deleteWarningRules(warningRule: WarningRules): Promise<WarningRules> {
    return super.delete('prewarning-rules/' + warningRule.id).then(warning => {
      return warning;
    });
  }

}
