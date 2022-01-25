import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';

import {
  AbstractControl,
  FormControl,

  ValidationErrors,
  ValidatorFn,
  
} from '@angular/forms';

import { max } from 'rxjs';
import { Medication } from 'src/app/models/Medication.model';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css']
})
export class AddMedicationComponent implements OnInit {
 

  medication?: Medication;

  contactForm: FormGroup = new FormGroup({});

  constructor(
    private authservice: AuthServiceService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      drugName: ['', Validators.required],
      drugGenericName: ['', Validators.required],
      drugBrandName: ['', Validators.required],
      drugForm: ['', Validators.required],

      drugStrength: ['', Validators.required],
      
    });
  }

  onFormSubmit() {
    let ob: Medication = new Medication();
    ob.drugName = this.contactForm.controls['drugName'].value;
    ob.drugGenericName = this.contactForm.controls['drugGenericName'].value;
    ob.drugBrandName = this.contactForm.controls['drugBrandName'].value;
    ob.drugForm = this.contactForm.controls['drugForm'].value;
    ob.drugStrength = this.contactForm.controls['drugStrength'].value;
  
    console.log("printing object data ")
    console.log(ob);

    this.authservice.addMedication(ob).subscribe((data) => {
      this.medication = data;
    });
    this.contactForm.reset();
  
    console.log(this.medication);
  }

 
}


