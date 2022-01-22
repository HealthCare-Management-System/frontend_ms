import { PatientDetails } from "./PatientDetails.model";
import { User } from "./user.model";

export class APPOINTMENT{
    "appid":number;
    "title": string;
    "description": string;
    "appointmentDate": string;
    "time": string;
    "patientIdInfo":PatientDetails |null |undefined;
    "physicianIdInfo":User;
    constructor(){
      
    }
}
