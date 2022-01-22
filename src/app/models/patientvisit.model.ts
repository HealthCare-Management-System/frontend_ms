import { Diagnosis } from "./Diagnosis.model";
import { Medication } from "./Medication.model";
import { Procedure } from "./procedure.model";
import { User } from "./user.model";
import { VitalSign } from "./vitalsigns.model";


export class PatientVisit {
    "id"?: number;
    "disgnosis":Diagnosis|null|undefined;
    "procedure":Procedure|null|undefined;
    "medication":Medication|null|undefined;
    "employeeId":User|null|undefined;
    "vitalSignId":VitalSign|null|undefined;
    constructor(){
      
    }
  }