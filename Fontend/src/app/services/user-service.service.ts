import { Injectable } from '@angular/core';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

// eslint-disable-next-line @typescript-eslint/no-empty-function
constructor() { }
    addUser(user: UserModel){
      let users = [];
      if (localStorage.getItem('Users')){ 
        users = JSON.parse(localStorage.getItem('Users') as string);
        users = [user, ...users];
      }
      else{
        users =[user];  
      }
      localStorage.setItem('Users', JSON.stringify(users))
    }
}
