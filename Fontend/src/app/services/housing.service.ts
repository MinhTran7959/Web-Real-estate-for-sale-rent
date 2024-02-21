import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from '../../environments/environment';
import { environmentPublic } from '../../environments/environment.prod';
import { IKeyValuePair } from '../model/IKeyValuePair';
@Injectable({
  providedIn: 'root'
})
  export class HousingService {

    constructor(private http:HttpClient) { }
    baseUrl = environment.baseUrl;
    baseUrlPublic = environmentPublic.baseUrl;

    getAllCities(): Observable<string[]> {
      return this.http.get<string[]>(this.baseUrl+'Citys/GetCity') as Observable<string[]>;
      //
    }

    getPropertyType(): Observable<IKeyValuePair[]> {
      return this.http.get<IKeyValuePair[]>(this.baseUrl+'PropertyType/List') as Observable<IKeyValuePair[]>;
      //
    }
    getFurnishingType(): Observable<IKeyValuePair[]> {
      return this.http.get<IKeyValuePair[]>(this.baseUrl+'FurnishingType/List') as Observable<IKeyValuePair[]>;
      //
    }

    getProperty(id: number){
      return this.http.get<Property>(this.baseUrl+"Property/Details/"+ id?.toString());
    }
    getAllproperties(SellRent?:number): Observable<Property[]> {
      return this.http.get<Property[]>(this.baseUrl+"Property/list/"+ SellRent?.toString());

    }
    addProperty(property: Property) {

      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.post<Property[]>(this.baseUrl+"Property/Add ", property, httpOptions);
    }
   
    
    // newPropID() {
    //   let pid: number;
    //   const storedPid = localStorage.getItem('PID');
    //   if (storedPid !== null) {
    //     pid = +storedPid + 1;
    //     localStorage.setItem('PID', String(pid));
    //   } else {
    //     pid = 101;
    //     localStorage.setItem('PID', '101');
    //   }
    //   return pid;
    // }

    getPropertyAge(dateofestablishment: Date | string | undefined): string {
      if (!dateofestablishment) {
        return 'Date not provided';
      }
    
      const esDate = new Date(dateofestablishment);
      const today = new Date();
    
      if (isNaN(esDate.getTime())) {
        return 'Invalid date';
      }
    
      let age = today.getFullYear() - esDate.getFullYear();
      const m = today.getMonth() - esDate.getMonth();
      
      if (m < 0 || (m === 0 && today.getDate() < esDate.getDate())) {
        age--;
      }
    
      if (today < esDate) {
        return '0';
      }
    
      if (age === 0) {
        return 'Less than a year';
      }
    
      return age.toString();
    }
    
  }
// lệnh tạo: (1)cd src/app/services  (2)ng g service housing ; 