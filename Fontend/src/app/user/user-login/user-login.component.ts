import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AltertifyService } from 'src/app/services/altertify.service';
import { AuthService } from 'src/app/services/auth.service';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';

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

  ngOnInit() {
  }
  onLogin(loginForm: NgForm ){
    // console.log(loginForm.value);
    const token= this.authService.authUser(loginForm.value);
    if(token){
      localStorage.setItem("token", token.userName);
      this.alertify.success('Login successful');
      this.router.navigate(['/']);
    }
    else{
      this.alertify.error('Username or password is wrong');
    }
  }
}
