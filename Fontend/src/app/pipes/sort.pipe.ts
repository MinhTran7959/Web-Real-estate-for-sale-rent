import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<String>, args: any[]): any {
    const sortField = args[0];
    const sortDirection = args[1];
    let mutiplier = 1;
      if( sortDirection === "desc"){
        mutiplier= -1;
      }

      if(value){
        value.sort((a: any , b: any)=>
        {
          if(a[sortField]< b[sortField]){
            return -1 * mutiplier;
          }
          else   if (a[sortField]>b[sortField]){
            return 1* mutiplier;
          }else{
            return 0;
          }
        }
      )
  
      return value;
    }
      }
    

}
