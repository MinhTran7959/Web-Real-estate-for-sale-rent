import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForRegisterModel, UserLoginModel } from '../model/user';
import { environment } from 'src/environments/environment';
import { environmentPublic } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

// eslint-disable-next-line @typescript-eslint/no-empty-function
constructor( private http: HttpClient) { }
    baseUrl = environment.baseUrl;
    baseUrlPublic = environmentPublic.baseUrl;
      authUser(user: UserLoginModel): Observable<UserLoginModel> {
    return this.http.post<UserLoginModel>(this.baseUrlPublic +"Account/Login", user);
    //return this.http.post<UserLoginModel>("https://webapi-refsr.azurewebsites.net/api/Account/Login", user);

    
}

  registerUser(user: UserForRegisterModel){
   // return this.http.post<UserForRegisterModel>("https://webapi-refsr.azurewebsites.net/api/Account/Register", user)
   return this.http.post<UserForRegisterModel>(this.baseUrlPublic +"Account/Register", user)
  }

}
  