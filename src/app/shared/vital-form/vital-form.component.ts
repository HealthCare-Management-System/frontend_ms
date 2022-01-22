import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientDetails } from 'src/app/models/PatientDetails.model';
import { User } from 'src/app/models/user.model';
import { VitalSign } from 'src/app/models/vitalsigns.model';
import { VitalSignService } from 'src/app/service/vitalsigns.service';

@Component({
  selector: 'app-vital-form',
  templateUrl: './vital-form.component.html',
  styleUrls: ['./vital-form.component.css'],
})
export class VitalFormComponent implements OnInit {
  VitalSignForm: FormGroup = new FormGroup({});

  @Input()
  patientInfoId:PatientDetails|null|undefined;
  @Input()
  employeeId:User|null|undefined;
  @Input()
  vitalSignId: VitalSign | null | undefined;

  constructor(public fb: FormBuilder,
    public vitalSignService:VitalSignService
    ) {}

  ngOnInit(): void {
    this.VitalSignForm = this.fb.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bloodpressure: ['', Validators.required],
      bodytemperature: ['', Validators.required],
      respirationrate: ['', Validators.required],
    });
  }

  onVitalSignFormSubmit() {
    let ob: VitalSign=new VitalSign();
    ob.height = this.VitalSignForm.value.height;
    ob.weight = this.VitalSignForm.value.weight;
    ob.bloodPressure = this.VitalSignForm.value.bloodpressure;
    ob.bodyTemperature = this.VitalSignForm.value.bodytemperature;
    ob.respirationRate = this.VitalSignForm.value.respirationrate;
    ob.employeeId=this.employeeId;
    ob.patientInfoId=this.patientInfoId;
    console.log(ob);
    this.vitalSignService.saveVitalSign(ob).subscribe();
  }
}
