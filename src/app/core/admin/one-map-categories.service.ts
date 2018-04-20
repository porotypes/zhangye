import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { OneMapCategories } from "../../common/one-map-categories";

@Injectable()
export class OneMapCategoriesService extends ServiceBaseService<OneMapCategories> {

  public updateOneMapCate: EventEmitter<any> = new EventEmitter();

  getOneMapCategoriesList(): Promise<OneMapCategories[]> {
    return super.getAll('onemapcategories').then(oneMapCategoriesList => {
      return oneMapCategoriesList;
    });
  }

  getOneMapCategories(id: number): Promise<OneMapCategories> {
    return super.get('onemapcategories/' + id).then(oneMapCategories => {
      return oneMapCategories;
    });
  }

  addOneMapCategories(request: any): Promise<OneMapCategories> {
    return super.post('onemapcategories', request).then(oneMapCategoriesList => {
      return oneMapCategoriesList;
    });
  }

  editOneMapCategories(id: number, request: Object): Promise<OneMapCategories> {
    return super.put('onemapcategories/' + id, request).then(oneMapCategoriesList => {
      return oneMapCategoriesList;
    });
  }

  deleteOneMapCategories(oneMapCategoy: OneMapCategories): Promise<OneMapCategories> {
    return super.delete('onemapcategories/' + oneMapCategoy.id).then(oneMapCategoriesList => {
      return oneMapCategoriesList;
    });
  }

}
