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
  noteForm: FormGroup = new FormGroup({});
  id?: number;
  loggedinUser?: User | null|undefined;
  successMsg!: string;
  constructor(
    public fb: FormBuilder,
    private noteservice: NotesService,
    public dialog: MatDialog,
    private authservice: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loggedinUser=this.authservice.isLoggedIn();
    this.noteForm = this.fb.group({
      sendDate: ['', Validators.required],
      receiverName: ['', Validators.required],
      message: ['', Validators.required],

      urgencyLevel: ['', Validators.required],
    });

  }
  onFormSubmit() {
    console.log(this.noteForm);
    let ob: NOTES = new NOTES();
    ob.sendDate =new Date();
    ob.receiverName = this.noteForm.controls['receiverName'].value;
    ob.senderName=this.loggedinUser?.name!;
    ob.message = this.noteForm.controls['message'].value;
    ob.urgencyLevel = this.noteForm.controls['urgencyLevel'].value;
    console.log(ob);
    this.noteservice.createNotes(ob).subscribe();
 
    window.alert('Msg send successfully');
  }
 
}
