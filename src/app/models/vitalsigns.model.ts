import { PatientDetails } from "./PatientDetails.model";
import { User } from "./user.model";

export class VitalSign {
    'id'!:number;
    'height': string;
    'weight': string;
    'bloodPressure': string;
    'bodyTemperature': string;
    'respirationRate': string;
    'dateTime':string;
    'meetingid':string|undefined;
    'patientInfoId':PatientDetails|null|undefined;
    'employeeId':User|null|undefined;

    constructor(){
      
    }
  }
