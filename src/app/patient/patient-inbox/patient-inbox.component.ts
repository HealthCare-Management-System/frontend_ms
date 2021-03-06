import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { PatientDetails } from 'src/app/models/PatientDetails.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/service/appointment.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';
import { InboxService } from 'src/app/service/inbox.service';
import { PatientInboxService } from 'src/app/service/patientinbox.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-patient-inbox',
  templateUrl: './patient-inbox.component.html',
  styleUrls: ['./patient-inbox.component.css'],
})
export class PatientInboxComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'physicianId',
    'date',
    'patientId',
    'time',
   
    'updateBooking',
    'editHistory',
    
    'patientDetails',
  ];
  // index: string[] = [ 'id','title', 'description', 'physician','patientId', 'date', 'time',
  // 'updateBooking',
  // 'editHistory',
  
  // 'patientDetails'];

  inboxdata: any = [];
  loggedinUser: User | null | undefined;

  patientInfoId: PatientDetails | null | undefined;

  constructor(
    private inboxservice: InboxService,
    private bookservice: AppointmentService,
    public dialog: MatDialog,
    private authservice: AuthServiceService,
    private patientservice: DemographicService
  ) {}

  ngOnInit(): void {
    this.loggedinUser = this.authservice.isLoggedIn();

    this.getPatientInfoId(this.loggedinUser?.id);
  }
  openProfile(element:APPOINTMENT) {
    console.log('i method');
    const dialogRef = this.dialog.open(ProfileComponent);
  }
  openAppointment(element: APPOINTMENT) {
    const dialogRef = this.dialog.open(AppointmentComponent);
  }

  loadusers(id:number) {
      this.inboxservice.getBookingByPatientById(id).subscribe((data) => {
      this.inboxdata = data;   
    });
  }
  getPatientInfoId(id: number|undefined) {
    this.patientservice.getPatientDemographicsById(id).subscribe((data) => {
      this.patientInfoId = data;
      this.loadusers(this.patientInfoId.id);
    });
  }
}
