import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Procedure } from 'src/app/models/procedure.model';

@Component({
  selector: 'app-add-procedure',
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.css'],
})
export class AddProcedureComponent implements OnInit {
  procedureIsDepricated1: string[] = ['true', 'false'];

  procedure?: Procedure;

  contactForm: FormGroup = new FormGroup({});

  constructor(
    private authservice: AuthServiceService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      procedureCode: ['', Validators.required],
      procedureDescription: ['', Validators.required],
      procedureIsDepricated2: ['', Validators.required],
    });
  }

  onFormSubmit() {
    let ob: Procedure = new Procedure();
    ob.procedureCode = this.contactForm.controls['procedureCode'].value;
    ob.procedureDescription =
      this.contactForm.controls['procedureDescription'].value;
    ob.procedureDepricated =
      this.contactForm.controls['procedureIsDepricated2'].value;
    console.log('printing dia data');

    console.log(ob);

    this.authservice.addProcedure(ob).subscribe((data) => {
      this.procedure = data;
    });
    this.contactForm.reset();

    console.log(this.procedure);
  }
}
