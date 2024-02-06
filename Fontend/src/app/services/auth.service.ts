import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

authUser(user: any): any {
  const userArry: Array<any> = JSON.parse(localStorage.getItem('Users') || '[]');
  return userArry.find(p => p.userName === user.userName && p.password === user.password);
}

}
