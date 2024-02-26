import { Component, OnInit } from '@angular/core';
import { AltertifyService } from '../services/altertify.service';

@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {
  loggedinUser!: string | null;
  ShowMyProperty!: boolean;
  userLogged?:string;
  constructor(private alter: AltertifyService) { }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(){
    //this.ShowMyProperty= false;
    const userLogged= localStorage.getItem('userName');
    if(userLogged != null){ this.userLogged = userLogged}
    
  }

  login() {
    this.loggedinUser = localStorage.getItem('userName');
    return this.loggedinUser;
  }
  onLogout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    this.alter.warning("Logged out!!");
    window.location.reload();
  }
}
