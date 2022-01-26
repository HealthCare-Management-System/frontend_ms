import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NOTES } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.css'],
})
export class UpdateNotesComponent implements OnInit {
  displayedColumns1: string[] = [
    'sendDate',
    'senderName',
    'message',
    'urgencyLevel',
    'action',
    'ReplySender',
  ];

  chatdata: any = [];
  noteForm: FormGroup = new FormGroup({});
  loggedinUser: User | null | undefined;
  badgeCounter!: number;
  hideMatBadge: boolean | undefined;
  sender!: User;
  receiverList!: User[];
  selectedReceiver: User | any;
  receiver: any = [];
  receiverName: any = [];
  constructor(
    public fb: FormBuilder,
    private noteservice: NotesService,
    public dialog: MatDialog,
    public authservice: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loggedinUser = this.authservice.isLoggedIn();
    this.getReceivers();
    this.loadReceivers();
    this.getSenderData();
    this.noteForm = this.fb.group({
      sendDate: ['', Validators.required],
      receiverId: ['', Validators.required],
      message: ['', Validators.required],
      urgencyLevel: ['', Validators.required],
    });
    this.loadData();
  }

  onFormSubmit() {
    console.log(this.noteForm);
    let ob: NOTES = new NOTES();
    ob.sendDate = new Date();
    ob.message = this.noteForm.controls['message'].value;
    ob.urgencyLevel = this.noteForm.controls['urgencyLevel'].value;
  //  ob.receiverId = this.noteForm.controls['receiverId'].value;
  //  ob.deleted = 'no';
  //  ob.read = 'not yet';
   
  //  ob.senderId = this.sender;
  //  ob.receiverId = this.selectedReceiver;
    this.noteservice.createNotes(ob).subscribe();
    window.alert('Msg send successfully');
    this.noteForm.reset();
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
  loadData() {
    return this.noteservice
      .getNotesByReceiver(this.loggedinUser?.id)
      .subscribe((data: {}) => {
        this.chatdata = data;
        console.log(this.chatdata);
      });
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
 
}
