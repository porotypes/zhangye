import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ngSelect'})
export class NgSelectPipe implements PipeTransform {
  transform(datas: any): string {
    console.log(datas);
    return datas.map(data => {
      data['text'] = data['name'];
      return data;
    });
  }
}
