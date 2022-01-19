import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../models/role-enum';
import { User } from '../models/user.model';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loggedinUser?: User | null;
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private authservice: AuthServiceService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    
    this.loggedinUser=this.authservice.isLoggedIn();

    this.redirectWindow();
  }

   login(name:string,pass:string) {
    this.authservice.login(name,pass);
  }

  onFormSubmit() {
      this.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    );
   
  }

  wait(ms: any) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
    this.redirectWindow();
  }

  printuser(){
    console.log(this.loggedinUser);
  }

  redirectWindow() {
    console.log("inside redirtect window");
    console.log(this.loggedinUser);
    if((this.loggedinUser != null) || (this.loggedinUser != undefined) )  
    {  

      if (this.loggedinUser?.role?.toUpperCase() == Roles.ADMIN) {
        this.router.navigate(['/admin/dashboard']);
      }
      if (this.loggedinUser?.role?.toUpperCase() == Roles.PHYSICIAN) {
        this.router.navigate(['/admin/dashboard']);
      }
      if (this.loggedinUser?.role?.toUpperCase() == Roles.NURSE) {
        this.router.navigate(['/admin/dashboard']);
      }
      if (this.loggedinUser?.role?.toUpperCase() == Roles.PATIENT) {
        this.router.navigate(['/patient/dashboard']);
      } 
    }  
    else  
    {  
        this.router.navigate(['/']);  
    }  
      
  }
}
