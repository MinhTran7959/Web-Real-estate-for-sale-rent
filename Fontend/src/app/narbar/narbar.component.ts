import { Component, OnInit } from '@angular/core';
import { AltertifyService } from '../services/altertify.service';

@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {
  public isCollapsed! : boolean;
  loggedinUser!: string | null;
  ShowMyProperty!: boolean;
  userLogged?:string;
  dataLoaded? = false;
  constructor(private alter: AltertifyService) { }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(){
    //this.ShowMyProperty= false;
    const userLogged= localStorage.getItem('userName');
    if(userLogged != null){ this.userLogged = userLogged}
    else{this.userLogged=''}
    this.loadData();
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
  loadData() {
    // Hãy thay thế dòng dưới đây bằng các logic tải dữ liệu thực tế
    setTimeout(() => {
      this.dataLoaded = true; // Đánh dấu rằng dữ liệu đã được tải xong
    }, 2000); // Giả định việc tải dữ liệu mất 2 giây
  }
}
