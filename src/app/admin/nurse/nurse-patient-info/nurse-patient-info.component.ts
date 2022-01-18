import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VitalSign } from 'src/app/models/vitalsigns.model';
import { VitalSignService } from 'src/app/service/vitalsigns.service';


@Component({
  selector: 'app-nurse-patient-info',
  templateUrl: './nurse-patient-info.component.html',
  styleUrls: ['./nurse-patient-info.component.css']
})
export class NursePatientInfoComponent implements OnInit {


 contactForm: FormGroup=new FormGroup({});

  constructor(public fb: FormBuilder,
    public vitalsignservice:VitalSignService) {
  
   }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
     height: ["", Validators.required],
    weight : ["", Validators.required],
    bloodpressure: ["", Validators.required],
    bodytemperature: ["", Validators.required],
    respirationrate: ["", Validators.required],
  });
  }
  onFormSubmit(){
   
      let height=this.contactForm.value.height;
      console.log(height);
      let weight=this.contactForm.value.weight;
      let bloodpressure=this.contactForm.value.bloodpressure;
      let bodytemperature=this.contactForm.value.bodytemperature;
      let respirationrate=this.contactForm.value.respirationrate;
      let obj:VitalSign=new VitalSign(height,weight,bloodpressure,bodytemperature,respirationrate);
      console.log(obj);
      this.vitalsignservice.saveVitalSign(obj).subscribe();
    }
    
  }

