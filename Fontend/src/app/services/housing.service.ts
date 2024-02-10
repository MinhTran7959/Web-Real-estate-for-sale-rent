import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';
import { IPropertyBase } from '../model/ipropertyBase';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getProperty(id: number){
    return  this.getAllproperties().pipe(
      map(propertiesArray =>{
        // throw new Error('Some error');
        return propertiesArray.find(p => p.Id === id) as Property;
      })
    );
  }

  getAllproperties(SellRent?:number): Observable<Property[]> {
   return this.http.get('data/properties.json').pipe(
    map((data: { [key: string]: any }) => {
      const propertiesArray: Array<Property> = [];
      const localPropertiesString = localStorage.getItem('newProp');
      let LocalProperties: any;
      if (localPropertiesString !== null) {
          LocalProperties = JSON.parse(localPropertiesString);
      }
      
      if(LocalProperties){
        for (const id in LocalProperties) {
          if(SellRent){
            if (LocalProperties.hasOwnProperty(id) && LocalProperties[id].SellRent === SellRent) {
              propertiesArray.push(LocalProperties[id]);
            }
          }
         else{
          propertiesArray.push(LocalProperties[id]);
         }
        }
      }
    
      for (const id in data) {
        if(SellRent){
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
        }
        else{
          propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
    })
    
   );
   return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property: Property) {
    let newProp = [property];
    const storedProp = localStorage.getItem('newProp');
    if (storedProp !== null) {
        newProp = [property, ...JSON.parse(storedProp)];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID() {
    let pid: number;
    const storedPid = localStorage.getItem('PID');
    if (storedPid !== null) {
      pid = +storedPid + 1;
      localStorage.setItem('PID', String(pid));
    } else {
      pid = 101;
      localStorage.setItem('PID', '101');
    }
    return pid;
  }


}
// lệnh tạo: (1)cd src/app/services  (2)ng g service housing ; 