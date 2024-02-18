import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForRegisterModel, UserLoginModel } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

// eslint-disable-next-line @typescript-eslint/no-empty-function
constructor( private http: HttpClient) { }

  authUser(user: UserLoginModel): Observable<UserLoginModel> {
    return this.http.post<UserLoginModel>("https://localhost:7035/api/Account/Login", user);
    //return this.http.post<UserLoginModel>("https://webapi-refsr.azurewebsites.net/api/Account/Login", user);

    
}

  registerUser(user: UserForRegisterModel){
    return this.http.post<UserForRegisterModel>("https://webapi-refsr.azurewebsites.net/api/Account/Register", user)
  }

}
  