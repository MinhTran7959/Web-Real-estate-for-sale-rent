import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserForRegisterModel } from 'src/app/model/user';

// import * as alertyfy from 'alertifyjs';
import { AltertifyService } from 'src/app/services/altertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class  UserRegisterComponent implements OnInit {
  registerationform!: FormGroup;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
show: any;
          constructor( private fb: FormBuilder ,
                       private authservice: AuthService , 
                       private altertify: AltertifyService
                      ) { }
  user? : UserForRegisterModel;
  userSubmited?: boolean;
  showPass = false;
  ngOnInit() {
    this.createRegisterationForm();
  }

  ShowPassword() {
    this.show = !this.show;
  }

  createRegisterationForm() {
    this.registerationform = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      phonenumber: [null, [Validators.required, Validators.maxLength(11),Validators.minLength(10)]],
      otherContactInformation: [null, [ Validators.maxLength(300)]]
    }, { validators: this.passwordMatchingValidator });
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : { notmatched: true };
  }
  



  get name(){
    return this.registerationform.get('name') as FormControl;
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
  get phonenumber(){
    return this.registerationform.get('phonenumber') as FormControl;
  }
  get otherContactInformation(){
    return this.registerationform.get('otherContactInformation') as FormControl;
  }
  onSubmit(){
    console.log(this.registerationform);

    this.userSubmited=true;
    if(this.registerationform.valid){
      this.authservice.registerUser(this.userData()).subscribe(()=>
      {
        this.onReset();
       this.altertify.success('Congrats, you are successfully registered');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      });
   
    }
  }

  onReset(){
    this.registerationform.reset();
        this.userSubmited= false;
  }

  userData(): UserForRegisterModel{
    return this.user = {
      name : this.name.value,
      email: this.email.value,
      password: this.password.value,
      phonenumber: this.phonenumber.value,
      otherContactInformation: this.otherContactInformation.value
    }
  }
 
}
