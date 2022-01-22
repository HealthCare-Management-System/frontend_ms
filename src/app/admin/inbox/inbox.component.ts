import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatNoDataRow, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { NOTES } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { AppointmentComponent } from 'src/app/patient/appointment/appointment.component';

import { ProfileComponent } from 'src/app/patient/profile/profile.component';
import { VisitPatientComponent } from 'src/app/patient/visit-patient/visit-patient.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { InboxService } from 'src/app/service/inbox.service';
import { NotesService } from 'src/app/service/notes.service';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  displayedColumns1: string[] = [
    'sendDate',
    'senderName',
    'message',
    'urgencyLevel',
    'isRead',
    'action',
    'ReplySender',
  ];

  chatdata: any = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'physicianId',
    'date',
    'patientId',
    'time',
    'patientDetails',
    'Actions',
    'updateBooking',
    'editHistory',
  ];
  index: string[] = [
    'title',
    'description',
    'physician',
    'date',
    'time',
    'Actions',
  ];
  noteForm: FormGroup = new FormGroup({});
  loggedinUser: User | null | undefined;
  firstName!: string | null | undefined;
  inboxdata: any = [];
  badgeCounter!: number;
  hideMatBadge: boolean = false;
  router: any;

  constructor(
   
    public fb: FormBuilder,
    private inboxservice: InboxService,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public noteservice: NotesService,
    public authservice: AuthServiceService
  ) {
    
  }
 
  ngOnInit(): void {
    this.loggedinUser = this.authservice.isLoggedIn();
  
       this.noteForm = this.fb.group({
      sendDate: ['', Validators.required],
      receiverName: ['', Validators.required],
      message: ['', Validators.required],

      urgencyLevel: ['', Validators.required],
    });
   // this.getAllAppointment();
     this.loadusers();
    // this.loadData();
  }
  openProfile(element: APPOINTMENT) {
    console.log('i method');
    const dialogRef = this.dialog.open(VisitPatientComponent);
  }
  openAppointment(element: APPOINTMENT) {
    const dialogRef = this.dialog.open(AppointmentComponent);
  }

  loadusers() {
    if (
      this.loggedinUser?.role === 'CT_NURSE'  
    ) {
      this.inboxservice.getAllBooking().subscribe((data) => {
        this.inboxdata = data;
      });
    } else if (this.loggedinUser?.role === 'CT_PHYSICIAN') {
      this.inboxservice
        .getBookingByPhysicianById(this.loggedinUser?.id)
        .subscribe((data) => {
          this.inboxdata = data;
        });
    } else if (this.loggedinUser?.role === 'CT_PATIENT') {
      this.inboxservice
        .getBookingByPatientById(this.loggedinUser?.id)
        .subscribe((data) => {
          this.inboxdata = data;
        });
    } else {
      window.alert('error');
    }
  }
  getAllAppointment(){
    return this.inboxservice.getAllBooking().subscribe((data:any)=>{
      this.inboxdata=data;
  // this.ing(this.inboxdata);
      console.log("list of booking ");
      console.log(data);
    });
  }
  // ing(inboxdata: any) {
  // for(var i)
  // }

  deleteApp(element: APPOINTMENT) {
    console.log('deleting by id');
    console.log(element.appid);
    this.inboxservice.deleteById(element.appid).subscribe((data) => {
      console.log(data);
      alert('successfully deleted');
      this.loadusers();
    });
  }
  loadData() {
    return this.noteservice
      .getNotesByName(this.loggedinUser?.name)
      .subscribe((data: {}) => {
        this.chatdata = data;
        console.log(this.chatdata);
       
      });
  }
  onFormSubmit() {
    console.log(this.noteForm);
    let ob: NOTES = new NOTES();
    ob.sendDate = new Date();
    ob.receiverName = this.noteForm.controls['receiverName'].value;
    ob.senderName = this.loggedinUser?.name!;
    console.log('sender name' + ob.senderName);
    ob.message = this.noteForm.controls['message'].value;
    ob.urgencyLevel = this.noteForm.controls['urgencyLevel'].value;
    console.log(ob);
    this.noteservice.createNotes(ob).subscribe();
    window.alert('Msg send successfully');
  
    this.noteForm.reset();
  }
  replyNote(element: NOTES) {
    console.log('in reply method');
    const dialogRef = this.dialog.open(UpdateNotesComponent);
  }
  deleteNotes(element: NOTES) {
    console.log('deleting by id');
    console.log(element.notesid);
    this.noteservice.deleteById(element.notesid).subscribe((data) => {
      console.log(data);
      alert('successfully deleted');
      this.loadData();
    });
  }

 

}
