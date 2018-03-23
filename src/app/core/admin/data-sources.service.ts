import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { DataSources } from "../../common/data-sources";

@Injectable()
export class DataSourcesService extends ServiceBaseService<DataSources> {

  getSourcesList(): Promise<DataSources[]> {
    return super.getAll('datasets').then(sourcesList => {
      return sourcesList;
    });
  }

  delUser(user: DataSources): Promise<DataSources> {
    const url = 'user/' + user.id;
    return super.delete(url).then(user => {
      return user;
    });
  }

}
