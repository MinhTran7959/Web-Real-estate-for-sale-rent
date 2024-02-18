import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AltertifyService } from 'src/app/services/altertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor( private authService : AuthService ,
               private alertify : AltertifyService ,
               private router: Router         
    ) { }

  ngOnInit() {undefined
  }
  onLogin(loginForm: NgForm ){
    
    this.authService.authUser(loginForm.value).subscribe(
      (response: UserLoginModel) =>{
          const user = response;
      localStorage.setItem("token", user.token);
      localStorage.setItem("userName", user.userName);
        console.log(user);
      this.alertify.success('Login successful');
      this.router.navigate(['/']);
   });



    // if(token){
    //   localStorage.setItem("token", token.userName);
    //   this.alertify.success('Login successful');
    //   this.router.navigate(['/']);
    // }
    // else{
    //   this.alertify.error('Username or password is wrong');
    // }
  }
}
