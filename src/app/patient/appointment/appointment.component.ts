import { identifierModuleUrl } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { PatientDetails } from 'src/app/models/PatientDetails.model';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  toCheck!: string;
  list!: string[];
  contactForm: FormGroup = new FormGroup({});
  toInformPatientDeatilsComponentFromAppointment!: string;
  successMsg!: string;
  loggedinUser: User | null | undefined;

  physicianForm: FormGroup = new FormGroup({});
  patientInfoId1: PatientDetails | null | undefined;

  patientInfo!: PatientDetails;

  physicianInfoList!: User[];
  physicianList: any[] | undefined;
  physician: any;
  getIdOfLoggedinUser!: number | undefined;
  physicians: any = [];
  physicianName: any = [];
  selectedPhysician: User | any;
  constructor(
    public fb: FormBuilder,
    private bookservice: AppointmentService,
    public authservice: AuthServiceService,
    public patientservice: DemographicService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadusers();
   
    this.loggedinUser = this.authservice.isLoggedIn();
    this.getPhysician();
    this.getPatientData();
    this.contactForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      physicianIdControl: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      time: ['', Validators.required],
    });
    this.toInformPatientDeatilsComponentFromAppointment = 'fromAppointment';
  }
  addItem(newItem: string) {
    this.successMsg = newItem;
    console.log(this.successMsg);
  }

  getPatientData() {
    console.log("inside user get");
    console.log(this.loggedinUser);
    return this.patientservice
      .getPatientDemographicsById(this.loggedinUser?.id)
      .subscribe((data) => {
        this.patientInfoId1 = data;
      });
  }

  selectPhysicianFromId(id: any) {
    for (let phy of this.physicianInfoList) {
      if (phy.id == id) {
        this.selectedPhysician = phy;
      }
    }
  }
  changevaluesforphysician() {
    this.selectPhysicianFromId(this.contactForm.value.physicianIdControl);
  }

  onFormSubmit() {
    console.log(this.contactForm);
    let ob: APPOINTMENT = new APPOINTMENT();
    ob.title = this.contactForm.controls['title'].value;
    ob.description = this.contactForm.controls['description'].value;
    ob.appointmentDate = this.contactForm.controls['appointmentDate'].value;
    ob.time = this.contactForm.controls['time'].value;
    ob.patientIdInfo = this.patientInfoId1;
    ob.physicianIdInfo = this.selectedPhysician;
    console.log('entered data+++++++++++');
    console.log(ob);
    this.bookservice.createBook(ob).subscribe();
    window.alert('Appointment booked successfully');
    this.router.navigate(['/patient/dashboard/patient-inbox']);
  }

  loadusers() {
    return this.authservice
      .getUsersBasedOnRoleAndStatus('CT_PHYSICIAN', 'Active')
      .subscribe((data: {}) => {
        this.physicians = data;
        for (let phy of this.physicians) {
          this.physicianName.push(phy.name);
        }

        this.physicians.splice(0, 1);
      });
  }
  getPhysician() {
    return this.authservice
      .getUsersBasedOnRoleAndStatus('CT_PHYSICIAN', 'Active')
      .subscribe((data: any) => {
        this.physicianInfoList = data;
      });
  }
}
