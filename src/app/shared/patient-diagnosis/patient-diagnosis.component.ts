import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { Diagnosis } from 'src/app/models/Diagnosis.model';
import { Medication } from 'src/app/models/Medication.model';
import { PatientDetails } from 'src/app/models/PatientDetails.model';
import { Procedure } from 'src/app/models/procedure.model';
import { User } from 'src/app/models/user.model';
import { VitalSign } from 'src/app/models/vitalsigns.model';
import { AppointmentService } from 'src/app/service/appointment.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';
import { VitalSignService } from 'src/app/service/vitalsigns.service';

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

  selectedDiagnosis: Diagnosis | null | undefined;
  selectedProcedure: Procedure | null | undefined;
  selectedMedication: Medication | null | undefined;
  diagnosisList: Diagnosis[] | any = [];
  procedureList: Procedure[] | any = [];
  medicationList: Medication[] | any = [];

  patientInfoId: PatientDetails | null | undefined;
  employeeId: User | null | undefined;
  vitalSignId: VitalSign | null | undefined;

  dataSource: any=[];
  selection:any;

  vitalentered = false;

  constructor(
    private authservice: AuthServiceService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private vitalSignService: VitalSignService,
    private patientservice: DemographicService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params) => (this.selectedMeeting = params.get('meetingid'))
    );

    this.getPatientInfoId(2);

    this.loggedinUser = this.authservice.isLoggedIn();
    console.log(this.loggedinUser);
    this.employeeId = this.loggedinUser;
    this.authservice.getDiagnosisData().subscribe((data) => {
      this.diagnosisList = data;
    });
    this.authservice.getProcedureData().subscribe((data) => {
      this.procedureList = data;
    });
    this.authservice.getMedicationData().subscribe((data) => {
      this.medicationList = data;
    });

    this.checkVitalSignValue();
  }

  checkVitalSignValue() {
    this.getVitalSignId(this.patientInfoId!.id); 
    if(this.vitalSignId !=null || this.vitalSignId != undefined){
      this.vitalentered=true;
    }

  }

  getPatientInfoId(id: number) {
    this.patientservice.getPatientDemographicsById(id).subscribe((data) => {
      this.patientInfoId = data;
      this.getVitalSignId(this.patientInfoId.id);
      if(this.patientInfoId===null){
        this.selection='no';
        console.log(this.selection)
      }else{
        this.selection='yes';
        console.log(this.selection);
        this.dataSource=this.patientInfoId.allergies;
      }
    });
  }

  getVitalSignId(id: number) {
    this.vitalSignService.getVitalSignByPatientId(id).subscribe((data) => {
      this.vitalSignId = data;
    });
  }

  getMeetingId(id:number){
    
  }
}
