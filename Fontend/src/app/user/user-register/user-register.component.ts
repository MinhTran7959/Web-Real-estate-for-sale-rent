import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserModel } from 'src/app/model/user';
import { UserServiceService } from 'src/app/services/user-service.service';

// import * as alertyfy from 'alertifyjs';
import { AltertifyService } from 'src/app/services/altertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class  UserRegisterComponent implements OnInit {
  registerationform!: FormGroup;
show: any;
          constructor( private fb: FormBuilder ,
                       private userService: UserServiceService , 
                       private altertify: AltertifyService
                      ) { }
  user? : UserModel;
  userSubmited?: boolean;
  showPass: boolean = false;
  ngOnInit() {
    // this.registerationform= new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required , Validators.email]),
    //   password: new FormControl(null , [Validators.required , Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null , [Validators.required]),
    //   mobile: new FormControl(null,[Validators.required, Validators.maxLength(10) ])
    // }, 
    this.createRegisterationForm();
  }

  ShowPassword() {
    this.show = !this.show;
  }

  createRegisterationForm() {
    this.registerationform = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(11),Validators.minLength(10)]]
    }, { validators: this.passwordMatchingValidator });
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
    console.log(this.registerationform);

    this.userSubmited=true;
    if(this.registerationform.valid){
      //this.user = Object.assign(this.user || {}, this.registerationform.value);
      this.userService.addUser(this.userData());
      this.registerationform.reset();
      this.userSubmited= false;
      this.altertify.success('Congrats, you are successfully registered');
    }
    else{
      this.altertify.error('kindly provide the required fields');
    }
  }
  userData(): UserModel{
    return this.user = {
      userName : this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }
 
}
