import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { firstNameValidator, passwordValidator } from './validators';
import { max } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.css'],
})
export class PatientSignupComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  unamePattern = '^[a-z0-9_-]{8,15}$';
  pwdPattern = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private authservice: AuthServiceService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  // ngOnInit(): void {
  //   this.contactForm = this.fb.group(
  //     {
  //       firstName: new FormControl('', [], ), //updateOn:  'change',
  //       lastName: new FormControl(''),
  //       email: new FormControl('', []),
  //       password: new FormControl('', [passwordValidator()]),
  //       confirmpassword: new FormControl('', []),
  //       formControlPhone: new FormControl('', []),

  //       title: new FormControl(''),
  //       dob: new FormControl(''),
  //       // dob : [new Date()],
  //     },
  //      [passwordValidator()]
  //   );
  // }

  get password() {
    return this.contactForm.controls['password'];
  }

  get confirmpassword() {
    return this.contactForm.controls['password'];
  }

  get email() {
    return this.contactForm.controls['email'];
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.pattern(this.unamePattern),
        firstNameValidator(),
      ]),
      lastName: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        // Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        //Validators.pattern(this.pwdPattern),
        // passwordValidator(),
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern(this.pwdPattern),
        // passwordValidator(),
      ]),
      formControlPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),

      title: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      // dob : [new Date()],
    });
  }

  onPasswordChange() {
    if (this.confirmpassword.value == this.password.value) {
      this.confirmpassword.setErrors(null);
    } else {
      this.confirmpassword.setErrors({ mismatch: true });
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  };
  onFormSubmit() {
    console.log(this.contactForm);
    console.log(this.contactForm.invalid);
    console.log(this.contactForm.valid);
    if (this.contactForm.invalid) {
      alert('Please fill the correct details');
      return;
    } else {
      let ob: User = new User();
      ob.name = this.contactForm.controls['firstName'].value;
      ob.lname = this.contactForm.controls['lastName'].value;
      ob.email = this.contactForm.controls['email'].value;
      ob.empid = 'PT0000';
      ob.dob = this.contactForm.controls['dob'].value;
      ob.role = 'ct_patient';
      ob.title = this.contactForm.controls['title'].value;
      ob.phone = this.contactForm.controls['formControlPhone'].value;
      ob.status = 'NotApproved';
      ob.doj= new Date();
      ob.password = this.contactForm.controls['password'].value;
      console.log(ob);

      this.authservice.createUser(ob).subscribe();
    }
    this.contactForm.reset();
    window.alert('Patient  has been registered successfully');
    this.router.navigate(['/']);
  }
}
