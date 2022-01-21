import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/service/appointment.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { InboxService } from 'src/app/service/inbox.service';

@Component({
  selector: 'app-visit-patient',
  templateUrl: './visit-patient.component.html',
  styleUrls: ['./visit-patient.component.css']
})
export class VisitPatientComponent implements OnInit {
 loggedinUser:User|null|undefined;
 id: any;
 data:any;
 response:any;
  constructor(
    public route:ActivatedRoute,
    public bookservice:InboxService,
    public authservice:AuthServiceService
  ) { }
  visitDate:Date | undefined;
  patientId!:string|null|undefined;
  patientName!:string|null|undefined;
  physicianId!:string|null|undefined;
  physicianName!:string|null|undefined;

  ngOnInit(): void {
    this.loggedinUser=this.authservice.isLoggedIn();
    this.visitDate=new Date();
    this.physicianId=this.loggedinUser?.empid;
    this.physicianName=this.loggedinUser?.name;
    this.id=this.route.snapshot.params['id'];
    this.id=this.route.snapshot.params['appid'];
      this.getOne();
    
   
  }
  getOne() {
    this.bookservice.getBookingById(this.id).subscribe(data=>
      {  
        this.data=data;
        console.log(data);
      })
   
  }
    

}
