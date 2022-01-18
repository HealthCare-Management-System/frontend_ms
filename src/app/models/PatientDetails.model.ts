
import { Allergy } from "./allergy.model";
import { Demographic } from "./demographic.model";
import { User } from "./user.model";

export class PatientDetails{
    patientDetails!:number;
    constructor(
       
        public demographic:Demographic|undefined|null,
        public employeeId:User|undefined|null,
        public allergies:Allergy[]|undefined|null,
    ){}
}
    
