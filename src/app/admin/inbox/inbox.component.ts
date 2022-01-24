import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { NOTES } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { AppointmentComponent } from 'src/app/patient/appointment/appointment.component';
import { UpdateAppointmentComponent } from 'src/app/patient/update-appointment/update-appointment.component';

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
    'action',
    'ReplySender',
  ];
  displayedColumns2: string[] = [
    'sendDate',
    'receiverName',
    'message',
    'urgencyLevel',
    'action',
  ];

  sentdata: any = [];
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
  sender!: User;
  receiverList!: User[];
  selectedReceiver: User | any;
  receiver: any = [];
  receiverName: any = [];
  constructor(
    public fb: FormBuilder,
    private inboxservice: InboxService,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public noteservice: NotesService,
    public authservice: AuthServiceService,
    public routerthing: Router
  ) {}

  ngOnInit(): void {
    this.loggedinUser = this.authservice.isLoggedIn();
    this.getReceivers();
    this.loadReceivers();
    this.getSenderData();
    this.loadSentNote();
    this.noteForm = this.fb.group({
      sendDate: ['', Validators.required],
      receiverId: ['', Validators.required],
      message: ['', Validators.required],
      urgencyLevel: ['', Validators.required],
    });
    this.loadData();
    this.loadusers();
  }
  openProfile(element: APPOINTMENT) {
    console.log('i method');
    const dialogRef = this.dialog.open(VisitPatientComponent);
  }
  openAppointment(element: APPOINTMENT) {
    const dialogRef = this.dialog.open(AppointmentComponent);
  }
  loadusers() {
    if (this.loggedinUser?.role === 'CT_NURSE') {
      this.inboxservice.getAllBooking().subscribe((data) => {
        console.log(this.inboxdata);
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
        .getBookingByPatientById(this.loggedinUser?.empid)
        .subscribe((data) => {
          this.inboxdata = data;
        });
    } else {
      window.alert('error');
    }
  }
  getAllAppointment() {
    return this.inboxservice.getAllBooking().subscribe((data: any) => {
      this.inboxdata = data;
      console.log('list of booking ');
      console.log(data);
    });
  }

  deleteApp(element: APPOINTMENT) {
    console.log('deleting by id');
    console.log(element);
    this.inboxservice.deleteById(element.appid).subscribe((data) => {
      console.log(data);
      alert('successfully deleted');
      this.loadusers();
    });
  }

  onFormSubmit() {
    console.log(this.noteForm);
    let ob: NOTES = new NOTES();
    ob.sendDate = new Date();
    ob.message = this.noteForm.controls['message'].value;
    ob.urgencyLevel = this.noteForm.controls['urgencyLevel'].value;
    ob.receiverId = this.noteForm.controls['receiverId'].value;
    ob.deleted = 'no';
    ob.read = 'not yet';
    ob.senderId = this.sender;
    ob.receiverId = this.selectedReceiver;
    this.noteservice.createNotes(ob).subscribe();
    window.alert('Msg send successfully');
    this.noteForm.reset();
  }

  routeinmethod(id: number) {
    this.routerthing.navigate(['admin/dashboard/patient-diagnosis'], {
      queryParams: { meetingid: id },
    });
  }

  getSenderData() {
    console.log('inside sender get');
    console.log(this.loggedinUser);
    return this.authservice.getUser(this.loggedinUser?.id).subscribe((data) => {
      this.sender = data;
    });
  }
  selectReceiverFromId(id: any) {
    for (let rev of this.receiverList) {
      if (rev.id == id) {
        this.selectedReceiver = rev;
      }
    }
  }
  changevaluesforreceiver() {
    this.selectReceiverFromId(this.noteForm.value.receiverId);
  }

  replyNote(element: NOTES) {
    console.log('in reply method');
    const dialogRef = this.dialog.open(UpdateNotesComponent);
  }

  deleteNotes(element: NOTES) {
    console.log('deleting by id');
    console.log(element);
    this.noteservice.deleteById(element.notesid).subscribe((data) => {
      console.log(data);
      alert('successfully deleted');
      this.loadData();
    });
  }
  getReceivers() {
    return this.authservice
      .getCorporateActiveUsers('ACTIVE')
      .subscribe((data: any) => {
        this.receiverList = data;
      });
  }
  loadReceivers() {
    return this.authservice
      .getCorporateActiveUsers('ACTIVE')
      .subscribe((data: {}) => {
        this.receiver = data;
        for (let phy of this.receiver) {
          this.receiverName.push(phy.name);
        }

        this.receiver.splice(0, 1);
      });
  }
  loadData() {
    return this.noteservice
      .getNotesByReceiver(this.loggedinUser?.id)
      .subscribe((data: {}) => {
        this.chatdata = data;
        console.log(this.chatdata);
      });
  }
  loadSentNote() {
    this.noteservice
      .getNotesBySender(this.loggedinUser?.id)
      .subscribe((data: {}) => {
        this.sentdata = data;
        console.log(this.sentdata);
      });
  }

}
