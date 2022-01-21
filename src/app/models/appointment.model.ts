import { PatientDetails } from "./PatientDetails.model";
import { User } from "./user.model";

export class APPOINTMENT{
    "appid":number;
    "title": string;
    "description": string;
    "appointmentDate": string;
    "time": string;
    "patientId":PatientDetails|null|undefined;
    "physicianId":User|null|undefined;
    constructor(){
      
    }
}
