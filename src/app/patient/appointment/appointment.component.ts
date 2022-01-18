import { identifierModuleUrl } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {

  list!:string[];
  contactForm: FormGroup = new FormGroup({});

  loggedinUser:User|null|undefined;
  constructor(
    public fb: FormBuilder,
    private bookservice: AppointmentService,
    public authservice:AuthServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loggedinUser=this.authservice.isLoggedIn();
    this.contactForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      physicianName: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      time: ['', Validators.required],
    
    
      
    });
  
   
  }

  onFormSubmit() {
    console.log(this.contactForm);
    let ob: APPOINTMENT = new APPOINTMENT();

    ob.title = this.contactForm.controls['title'].value;
    ob.description = this.contactForm.controls['description'].value;
    ob.physicianName = this.contactForm.controls['physicianName'].value;
    ob.appointmentDate = this.contactForm.controls['appointmentDate'].value;
    ob.time = this.contactForm.controls['time'].value;
    ob.patientId=this.loggedinUser?.empid!;
    // ob.physicianId=
    
    console.log('entered data'+ob);

    this.bookservice.createBook(ob).subscribe();
     window.alert('Appointment booked successfully');
  
    this.router.navigate(['/patient/dashboard/patient-inbox']);

  }
  
  getPhysicianNameList(){
     this.authservice.getPhysicianList('PHYSICIAN').subscribe(data=>{
      this.list=data;
      console.log(data);
    });
  }


}
