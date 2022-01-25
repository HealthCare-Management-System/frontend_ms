import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Diagnosis } from 'src/app/models/Diagnosis.model';

@Component({
  selector: 'app-add-dignosis',
  templateUrl: './add-dignosis.component.html',
  styleUrls: ['./add-dignosis.component.css'],
})
export class AddDignosisComponent implements OnInit {
  diagnosisIsDepricated1: string[] = ['true', 'false'];

  diagnosis?: Diagnosis;

  contactForm: FormGroup = new FormGroup({});

  constructor(
    private authservice: AuthServiceService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      diagnosisCode: ['', Validators.required],
      diagnosisDescription: ['', Validators.required],
      diagnosisIsDepricated2: ['', Validators.required],
    });
  }

  onFormSubmit() {
    let ob: Diagnosis = new Diagnosis();
    ob.diagnosisCode = this.contactForm.controls['diagnosisCode'].value;
    ob.diagnosisDescription =
      this.contactForm.controls['diagnosisDescription'].value;
    ob.diagnosisIsDepricated =
      this.contactForm.controls['diagnosisIsDepricated2'].value;
      console.log("printing dia data");
      
   
    console.log(ob);
    

    this.authservice.addDiagnosis(ob).subscribe((data) => {
      this.diagnosis = data;
    });
    this.contactForm.reset();

    console.log(this.diagnosis);
  }
}
