import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';

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
   return this.http.get<IProperty[]>('data/properties.json');
  }
  addProperty(property: Property) {
    localStorage.setItem('newProp', JSON.stringify(property));
  }
}
// lệnh tạo: (1)cd src/app/services  (2)ng g service housing ; 