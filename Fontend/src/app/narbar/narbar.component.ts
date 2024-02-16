import { Component, OnInit } from '@angular/core';
import { AltertifyService } from '../services/altertify.service';

@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {
  loggedinUser!: string | null;

  constructor(private alter: AltertifyService) { }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(){}

  login() {
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }
  onLogout(){
    localStorage.removeItem('token')
    this.alter.success("Logout successful")
  }
}
