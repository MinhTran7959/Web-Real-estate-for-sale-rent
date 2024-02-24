import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {
    if (!value || filterString === '' || propName === '') {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName] && item[propName].toLowerCase().includes(filterString.toLowerCase())) {
        resultArray.push(item);
      }
    }
    //console.log(resultArray)
    return resultArray;
  }
}
