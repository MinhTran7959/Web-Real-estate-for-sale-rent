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
      return this.http.get<string[]>(this.baseUrlPublic+'Citys/GetCity') as Observable<string[]>;
      //
    }

    getPropertyType(): Observable<IKeyValuePair[]> {
      return this.http.get<IKeyValuePair[]>(this.baseUrlPublic+'PropertyType/List') as Observable<IKeyValuePair[]>;
      //
    }
    getFurnishingType(): Observable<IKeyValuePair[]> {
      return this.http.get<IKeyValuePair[]>(this.baseUrlPublic+'FurnishingType/List') as Observable<IKeyValuePair[]>;
      //
    }

    getProperty(id: number){
      return this.http.get<Property>(this.baseUrlPublic+"Property/Details/"+ id?.toString());
    }

    getPropertyView(id: number){
      return this.http.get<Property>(this.baseUrlPublic+"Property/TopView/"+ id?.toString());
    }

    getView(property: Property,PropId: number){
      return this.http.patch<Property>(this.baseUrlPublic+"Property/View/"+ PropId?.toString(),property );
    }
    
    getPropertyUpdate(id: number){
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.get<Property>(this.baseUrlPublic+"Property/DetailsUpdate/"+ id?.toString(),httpOptions);
    }
    
    getAllproperties(SellRent?:number): Observable<Property[]> {
      return this.http.get<Property[]>(this.baseUrlPublic+"Property/list/"+ SellRent?.toString());

    }
    getAllpropertiesView(): Observable<Property[]> {
      return this.http.get<Property[]>(this.baseUrlPublic+"Property/TopView");
    }

    getFavoritesList(name: string): Observable<Property[]> {
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.get<Property[]>(this.baseUrlPublic+"FavoritesList/FacvoritesList/"+ name ,httpOptions);
    }

    AddFavoritesList(name: string ,  propId: number): Observable<Property[]> {
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.get<Property[]>(this.baseUrlPublic+"FavoritesList/FacvoritesList/"+ name +'/'+propId ,httpOptions);
    }

    getMyproperties(UserName?:string): Observable<Property[]> {
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.get<Property[]>(this.baseUrlPublic+"Property/MyProperty/"+ UserName?.toString(),httpOptions);
     
    }

   
    addProperty(property: Property) {

      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.post<Property[]>(this.baseUrlPublic+"Property/Add ", property, httpOptions);
    }

    updateProperty(property: Property , propertyId: number){
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.put<Property[]>(this.baseUrlPublic+"Property/Update/"+propertyId, property, httpOptions);
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
      return this.http.post(this.baseUrlPublic+"Property/set-primary-photo/"+ propertyId+"/"+ propertyPhotoId, {},httpOptions )
    }

    deletePhoto(propertyId: number , propertyPhotoId : string){
      const httpOptions={
        headers: new HttpHeaders({
          Authorization: 'Bearer '+ localStorage.getItem("token")
        })
      };
      return this.http.delete(this.baseUrlPublic+"Property/delete-photo/"+ propertyId+"/"+ propertyPhotoId, httpOptions )
    }
  }
