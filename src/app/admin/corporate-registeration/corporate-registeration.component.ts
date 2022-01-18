import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-corporate-registeration',
  templateUrl: './corporate-registeration.component.html',
  styleUrls: ['./corporate-registeration.component.css'],
})
export class CorporateRegisterationComponent implements OnInit {
  roles: string[] = ['Physician', 'Nurse', 'Admin'];

  employee?: User;

  contactForm: FormGroup = new FormGroup({});

  constructor(
    private authservice: AuthServiceService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      empId: ['', Validators.required],

      title: ['', Validators.required],
      dob: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onFormSubmit() {
    let ob: User = new User();
    ob.name = this.contactForm.controls['firstName'].value;
    ob.lname = this.contactForm.controls['lastName'].value;
    ob.email = this.contactForm.controls['email'].value;
    ob.empid = this.contactForm.controls['empId'].value;
    ob.dob = this.contactForm.controls['dob'].value;
    ob.role = this.contactForm.controls['role'].value;
    ob.title = this.contactForm.controls['title'].value;
    ob.phone = '000000000';
    ob.status = 'Active';
    ob.doj=new Date();

    ob.password = '12345';
    console.log(ob);

    this.authservice.createUser(ob).subscribe((data) => {
      this.employee = data;
    });
    this.contactForm.reset();
  
    console.log(this.employee);
  }

 
}


