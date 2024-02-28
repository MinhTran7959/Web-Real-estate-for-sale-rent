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
    getPropertyUpdate(id: number){
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.get<Property>(this.baseUrl+"Property/DetailsUpdate/"+ id?.toString(),httpOptions);
    }
    
    getAllproperties(SellRent?:number): Observable<Property[]> {
      return this.http.get<Property[]>(this.baseUrl+"Property/list/"+ SellRent?.toString());

    }


    getMyproperties(UserName?:string): Observable<Property[]> {
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.get<Property[]>(this.baseUrl+"Property/MyProperty/"+ UserName?.toString(),httpOptions);
     
    }

   
    addProperty(property: Property) {

      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.post<Property[]>(this.baseUrl+"Property/Add ", property, httpOptions);
    }

    updateProperty(property: Property , propertyId: number){
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.put<Property[]>(this.baseUrl+"Property/Update/"+propertyId, property, httpOptions);
    }
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
    
    setPrimaryPhoto(propertyId: number , propertyPhotoId : string){
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.post(this.baseUrl+"Property/set-primary-photo/"+ propertyId+"/"+ propertyPhotoId, {},httpOptions )
    }

    deletePhoto(propertyId: number , propertyPhotoId : string){
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.delete(this.baseUrl+"Property/delete-photo/"+ propertyId+"/"+ propertyPhotoId, httpOptions )
    }
  }
