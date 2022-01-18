import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NOTES } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NotesService } from 'src/app/service/notes.service';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css'],
})
export class ChatInboxComponent implements OnInit {
  displayedColumns1: string[] = [
    'sendDate',

    'senderName',
    'message',
    'urgencyLevel',
    'isDeleted',
    'reply',
    'isRead',
    'action',
    'ReplySender',
  ];

  chatdata: any = [];

  noteForm: FormGroup = new FormGroup({});
  loggedinUser:User|null|undefined;
  badgeCounter!: number;
  hideMatBadge : boolean | undefined;
  constructor(
    public fb: FormBuilder,
    private noteservice: NotesService,
    public dialog: MatDialog,
    public authservice:AuthServiceService
  ) {
    this.hideMatBadge = true;
    this.badgeCounter = 0;
  }
 
  incrementCount() {
    this.badgeCounter++;
    this.hideMatBadge = false;
  }
  decreaseCount() {
    if(this.badgeCounter < 0)
    return;
   this.badgeCounter--;
   if(this.badgeCounter == 0){
     this.hideMatBadge = true;
   }
  }
  resetCount() {
    this.badgeCounter = 0;
    this.hideMatBadge = true;
  }
  ngOnInit(): void {
    this.loggedinUser=this.authservice.isLoggedIn();
    this.noteForm = this.fb.group({
      sendDate: ['', Validators.required],
      receiverName: ['', Validators.required],
           message: ['', Validators.required],

      urgencyLevel: ['', Validators.required],
    });
    this.loadData();
    console.log("login user=="+this.loggedinUser);
  }

  onFormSubmit() {
    console.log(this.noteForm);
    let ob: NOTES = new NOTES();
    ob.sendDate =new Date();
    ob.receiverName = this.noteForm.controls['receiverName'].value;
    ob.senderName=this.loggedinUser?.name!;
    console.log("sender name"+ob.senderName);
    ob.message = this.noteForm.controls['message'].value;
    ob.urgencyLevel = this.noteForm.controls['urgencyLevel'].value;
    console.log(ob);
    this.noteservice.createNotes(ob).subscribe();
    window.alert('Msg send successfully');
    this.noteForm.reset();
  }

  loadData() {
     
    return this.noteservice.getNotesByName(this.loggedinUser?.name).subscribe((data: {}) => {
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
}
