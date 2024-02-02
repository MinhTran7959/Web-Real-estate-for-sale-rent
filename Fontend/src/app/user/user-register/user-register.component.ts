import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class  UserRegisterComponent implements OnInit {
  registerationform!: FormGroup;
  constructor() { }

  ngOnInit() {
    this.registerationform= new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required , Validators.email]),
      password: new FormControl(null , [Validators.required , Validators.minLength(8)]),
      confirmPassword: new FormControl(null , [Validators.required]),
      mobile: new FormControl(null,[Validators.required, Validators.maxLength(10) ])

    }, this.passwordMatchingValidator);
  }

  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : { notmatched: true };
  }
  

  get userName(){
    return this.registerationform.get('userName') as FormControl;
  }
  get email(){
    return this.registerationform.get('email') as FormControl;
  }
  get password(){
    return this.registerationform.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registerationform.get('confirmPassword') as FormControl;
  }
  get mobile(){
    return this.registerationform.get('mobile') as FormControl;
  }

  onSubmit(){
    console.log(this.registerationform)
  }
}
