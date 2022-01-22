import { PatientDetails } from "./PatientDetails.model";
import { User } from "./user.model";

export class APPOINTMENT{
    "appid":number;
    "title": string;
    "description": string;
    "appointmentDate": string;
    "time": string;
<<<<<<< HEAD
    "patientIdInfo":PatientDetails |null |undefined;
=======
    "patientIdInfo":PatientDetails | null | undefined;
>>>>>>> origin/inboxms
    "physicianIdInfo":User;
   
    constructor(){
      
    }
}
