import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NOTES } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-patient-notes',
  templateUrl: './patient-notes.component.html',
  styleUrls: ['./patient-notes.component.css'],
})
export class PatientNotesComponent implements OnInit {
  displayedColumns: string[] = [
    'sendDate',
    'senderName',
    'message',
    'urgencyLevel',
   'action',
  ];

  chatdata: any = [];
  loggedinUser:User|null|undefined;
  noteForm: FormGroup = new FormGroup({});
  constructor(public fb: FormBuilder,
    public authservice:AuthServiceService,
     private noteservice: NotesService) {}

  ngOnInit(): void {
    this.loggedinUser=this.authservice.isLoggedIn();
    this.noteForm = this.fb.group({
      sendDate: ['', Validators.required],
      senderName: ['', Validators.required],
      receiverName: ['', Validators.required],
      message: ['', Validators.required],

      urgencyLevel: ['', Validators.required],
    });
    this.loadData();
  }

  onFormSubmit() {
    console.log(this.noteForm);
    let ob: NOTES = new NOTES();
    ob.sendDate = this.noteForm.controls['sendDate'].value;

    ob.receiverId = this.noteForm.controls['receiverName'].value;
    ob.message = this.noteForm.controls['message'].value;
    ob.urgencyLevel = this.noteForm.controls['urgencyLevel'].value;
    console.log(ob);
    this.noteservice.createNotes(ob).subscribe();
    window.alert('Msg send successfully');
  }

  loadData() {
    return this.noteservice.getNotesByReceiver(this.loggedinUser?.id).subscribe((data: {}) => {
      this.chatdata = data;
      console.log(this.chatdata);
    });
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
