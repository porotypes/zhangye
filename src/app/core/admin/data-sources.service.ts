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

  addSources(request: any): Promise<DataSources> {
    return super.post('datasets', request).then(sources => {
      return sources;
    });
  }

  editSources(id: number, request: Object): Promise<DataSources> {
    return super.put('datasets/' + id, request).then(sources => {
      return sources;
    });
  }

  deleteSource(sources: DataSources): Promise<DataSources> {
    return super.delete('datasets/' + sources.id).then(sources => {
      return sources;
    });
  }

}
