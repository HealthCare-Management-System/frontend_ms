import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/service/appointment.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-patient-diagnosis',
  templateUrl: './patient-diagnosis.component.html',
  styleUrls: ['./patient-diagnosis.component.css'],
})
export class PatientDiagnosisComponent implements OnInit {
  loggedinUser: User | null | undefined;
  meeting: APPOINTMENT | null | undefined;
  patient: User | null | undefined;
  selectedMeeting: String | null | undefined;
  VitalSignForm: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});

  constructor(
    public fb: FormBuilder,
    public authservice: AuthServiceService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params) => (this.selectedMeeting = params.get('username'))
    );
    this.appointmentService.getAppointmentById(1);
    this.loggedinUser = this.authservice.isLoggedIn();
    console.log(this.loggedinUser);

    this.VitalSignForm = this.fb.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bloodpressure: ['', Validators.required],
      bodytemperature: ['', Validators.required],
      respirationrate: ['', Validators.required],
    });

    this.contactForm = this.fb.group({
      code1: ['', Validators.required],
      description1: ['', Validators.required],
      depricated1: ['', Validators.required],
      code2: ['', Validators.required],
      description2: ['', Validators.required],
      depricated2: ['', Validators.required],
      id: ['', Validators.required],
      name: ['', Validators.required],
      genericname: ['', Validators.required],
      brandname: ['', Validators.required],
      form: ['', Validators.required],
      strength: ['', Validators.required],
    });
  }

  onVitalSignFormSubmit() {
    let height = this.VitalSignForm.value.height;
    let weight = this.VitalSignForm.value.weight;
    let bloodpressure = this.VitalSignForm.value.bloodpressure;
    let bodytemperature = this.VitalSignForm.value.bodytemperature;
    let respirationrate = this.VitalSignForm.value.respirationrate;

    console.log(this.VitalSignForm.value);
  }
  onFormSubmit() {
    let code1 = this.contactForm.value.code1;
    let description1 = this.contactForm.value.description1;
    let depricated1 = this.contactForm.value.depricated1;
    let code2 = this.contactForm.value.code2;
    let description2 = this.contactForm.value.description2;
    let depricated2 = this.contactForm.value.depricated2;
    let id = this.contactForm.value.id;
    let name = this.contactForm.value.name;
    let genericname = this.contactForm.value.genericname;
    let brandname = this.contactForm.value.brandname;
    let form = this.contactForm.value.form;
    let strength = this.contactForm.value.strength;

    console.log(this.contactForm.value);
  }
}
