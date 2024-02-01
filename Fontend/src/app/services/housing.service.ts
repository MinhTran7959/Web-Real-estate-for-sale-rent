import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProperty } from '../Property/IProperty.interface';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }
  getAllproperties(SellRent:number): Observable<IProperty[]> {
   return this.http.get('data/properties.json').pipe(
    map((data: { [key: string]: any }) => {
      const propertiesArray: Array<IProperty> = [];
      for (const id in data) {
        if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
          propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
    })
    
   );
  }
}
// lệnh tạo: (1)cd src/app/services  (2)ng g service housing ; 