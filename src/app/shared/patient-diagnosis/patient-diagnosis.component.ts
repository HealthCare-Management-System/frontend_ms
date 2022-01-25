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
import { PatientVisitServiceService } from 'src/app/service/patient-visit-service.service';
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

  dataSource: any = [];
  dataSource2: any = [];
  selection: any;

  vitalentered = false;

  constructor(
    private authservice: AuthServiceService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private vitalSignService: VitalSignService,
    private patientservice: DemographicService,
    private patientVisitServiceService: PatientVisitServiceService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.selectedMeeting = params.get('meetingid');
      this.getMeetingId(Number(this.selectedMeeting));
    });
    this.loggedinUser = this.authservice.isLoggedIn();
    
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
    this.getVisitPatientList(this.patientInfoId!.id);
  }

  getMeetingId(id: number) {
    this.appointmentService.getAppointmentById(id).subscribe((data) => {
      this.meeting = data;
      this.getPatientInfoId(this.meeting.patientIdInfo?.user?.id);
    });
  }

  getPatientInfoId(id: number | undefined) {
    this.patientservice.getPatientDemographicsById(id).subscribe((data) => {
      this.patientInfoId = data;
      this.getVitalSignId(this.patientInfoId.id,this.selectedMeeting);
      if (this.patientInfoId === null) {
        this.selection = 'no';
        console.log(this.selection);
      } else {
        this.selection = 'yes';
        console.log(this.selection);
        this.dataSource = this.patientInfoId.allergies;
      }
    });
  }

  getVitalSignId(id: number | undefined,meetingid:String| null | undefined) {
    this.vitalSignService.getVitalSignByPatientIdAndMeetingId(id,meetingid).subscribe((data) => {
      this.vitalSignId = data;
    });
  }

  getVisitPatientList(id:number) {
    this.patientVisitServiceService.getPatientVisitInfoByPatientId(id).subscribe((data) => {
      this.dataSource2 = data;
      console.log("********************inside patient visdit data*************************************")
      console.log(this.dataSource2);
    });
  }

  checkVitalSignValue() {
    this.getVitalSignId(this.patientInfoId!.id,this.selectedMeeting);
    if (this.vitalSignId != null || this.vitalSignId != undefined) {
      this.vitalentered = true;
    }
    this.getVisitPatientList(this.patientInfoId!.id);
  }
}
