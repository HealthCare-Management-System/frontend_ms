export class APPOINTMENT{
    "appid":number;
    "title": string;
    "description": string;
    "physicianName":string;
    "appointmentDate": string;
    "time": string;
    "patientId":string;
    "physicianId":string;
    constructor(){
      
    }
}
export class VITAL_SIGNS{

    "id":number;
	"height":string;
	"weight":string;
	"bloodPressure":string;
	"bodyTemperature":string;
	"respirationRate":string;
	"dateTime":string;
	"patientInfoId":string;
	"employeeId":string;

    constructor(){

    }
}
