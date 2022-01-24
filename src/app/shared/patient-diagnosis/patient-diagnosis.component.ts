import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APPOINTMENT } from 'src/app/models/appointment.model';
import { Diagnosis } from 'src/app/models/Diagnosis.model';
import { Medication } from 'src/app/models/Medication.model';
import { Procedure } from 'src/app/models/procedure.model';
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

  selectedDiagnosis: Diagnosis|null|undefined;
  selectedProcedure: Procedure|null|undefined;
  selectedMedication: Medication|null|undefined;
  diagnosisList: Diagnosis[]|any=[];
  procedureList: Procedure[]|any=[];
  medicationList: Medication[]|any=[];

  constructor(
    public authservice: AuthServiceService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params) => (this.selectedMeeting = params.get('username'))
    );
   
    this.loggedinUser = this.authservice.isLoggedIn();
    console.log(this.loggedinUser);

    this.authservice.getDiagnosisData().subscribe((data) =>{

      this.diagnosisList=data;

    });
    this.authservice.getProcedureData().subscribe((data) =>{

      this.procedureList=data;

    });
    this.authservice.getMedicationData().subscribe((data) =>{

      this.medicationList=data;

    });
    
  }

 
  
  setDiagnosisList(){
    let ob1: Diagnosis = new Diagnosis();
    ob1.id=1;
    ob1.diagnosisCode="11";
    ob1.diagnosisDescription="aaa";
    ob1.diagnosisIsDepricated=false;

    let ob2: Diagnosis = new Diagnosis();
    ob2.id=2;
    ob2.diagnosisCode="22";
    ob2.diagnosisDescription="bbb";
    ob2.diagnosisIsDepricated=false;

    let ob3: Diagnosis = new Diagnosis();
    ob3.id=3;
    ob3.diagnosisCode="333";
    ob3.diagnosisDescription="ccc";
    ob3.diagnosisIsDepricated=false;


    this.diagnosisList.push(ob1,ob2,ob3);
   }
   setProcedureList(){
    let ob1: Procedure = new Procedure();
    ob1.id=1;
    ob1.procedureCode="11";
    ob1.procedureDescription="aaapppp";
    ob1.procedureDepricated=false;

    let ob2: Procedure = new Procedure();
    ob2.id=2;
    ob2.procedureCode="22";
    ob2.procedureDescription="bbbppp";
    ob2.procedureDepricated=false;

    let ob3: Procedure = new Procedure();
    ob3.id=3;
    ob3.procedureCode="333";
    ob3.procedureDescription="cccppp";
    ob3.procedureDepricated=false;


    this.procedureList.push(ob1,ob2,ob3);
   }
   setMedicationList(){
    let ob1: Medication = new Medication();
    ob1.id=1;
    ob1.drugName="11";
    ob1.drugForm="aaa";
    ob1.drugBrandName="aaaaa";
    ob1.drugGenericName="aaaaa";
    ob1.drugStrength="1";

    let ob2: Medication = new Medication();
    ob2.id=2;
    ob2.drugName="22";
    ob2.drugForm="bbb";
    ob2.drugBrandName="bbbb";
    ob2.drugGenericName="bbbb";
    ob2.drugStrength="2";

    let ob3: Medication = new Medication();
    ob3.id=3;
    ob3.drugName="33";
    ob3.drugForm="ccc";
    ob3.drugBrandName="ccccc";
    ob3.drugGenericName="cccc";
    ob3.drugStrength="3";
    this.medicationList.push(ob1,ob2,ob3);
   }

}
