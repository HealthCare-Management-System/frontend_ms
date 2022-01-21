import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Diagnosis } from 'src/app/models/Diagnosis.model';
import { Medication } from 'src/app/models/Medication.model';
import { PatientVisit } from 'src/app/models/patientvisit.model';
import { Procedure } from 'src/app/models/procedure.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-medication-form',
  templateUrl: './testing.html',
  styleUrls: ['./medication-form.component.css'],
})
export class MedicationFormComponent implements OnInit {
  @Input()
  public loggedinUser?: User | null;
  @Input()
  diagnosisList: Diagnosis[] | any;
  @Input()
  procedureList: Procedure[] | any;
  @Input()
  medicationList: Medication[] | any;

  selectedDiagnosis: Diagnosis[] | any="";
  selectedProcedure: Diagnosis[] | any="";
  selectedMedication: Diagnosis[] | any="";

  contactForm: FormGroup = new FormGroup({});

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('***inside medicination form***********');
    console.log(this.diagnosisList);
    console.log(this.procedureList);
    console.log(this.medicationList);
    console.log('***done medicination form***********');
    this.contactForm = this.fb.group({
      code1: [''],
      diagnosisControl: [''],
      procedureControl: [''],
      medicationControl: ['', Validators.required],
      description1: ['', Validators.required],
      depricated1: ['', Validators.required],
      code2: ['', Validators.required],
      description2: ['', Validators.required],
      depricated2: ['', Validators.required],
      drugGenericName:['', Validators.required],
      drugname: ['', Validators.required],
      brandname: ['', Validators.required],
      drugForm: ['', Validators.required],
      drugStrength: ['', Validators.required],
    });
  }

  onFormSubmit() {
    
    let ob :PatientVisit= new PatientVisit();
    ob.disgnosis=this.selectedDiagnosis;
    ob.medication=this.selectedMedication;
    ob.procedure=this.selectedProcedure;

    console.log(ob);
  }

  selectDiagnosisFromId(id: string) {
    for (let diagnosis of this.diagnosisList) {
      if (diagnosis.id == id) {
        this.selectedDiagnosis=diagnosis;
      }
    }
  }
  selectProcedureFromId(id: string) {
    for (let procedure of this.procedureList) {
      if (procedure.id == id) {
        this.selectedProcedure=procedure;
      }
    }
  }
  selectMedicationFromId(id: string) {
    for (let medication of this.medicationList) {
      if (medication.id == id) {
        this.selectedMedication=medication;
      }
    }
  }

  changevaluesfordiagnosis(){
    this.selectDiagnosisFromId(this.contactForm.value.diagnosisControl);
  }
  changevaluesforProcedure(){
    this.selectProcedureFromId(this.contactForm.value.procedureControl);
  }
  changevaluesformedication(){
    this.selectMedicationFromId(this.contactForm.value.medicationControl);
  }
}
