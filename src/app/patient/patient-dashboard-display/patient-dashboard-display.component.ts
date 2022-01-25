import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AllergyService } from 'src/app/service/allergy.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';


@Component({
  selector: 'app-patient-dashboard-display',
  templateUrl: './patient-dashboard-display.component.html',
  styleUrls: ['./patient-dashboard-display.component.css']
})
export class PatientDashboardDisplayComponent implements OnInit {
  display!:string;
  loggedinUser?: User | null;
  selection!:string;
  patientDetails:any;
  dataSource: any=[];
  constructor( private authservice: AuthServiceService, public demographicService: DemographicService, public allergyService: AllergyService,public router: Router) { }
  displayedColumns1:string[]=['allergyType', 'allergyName', 'allergyDescription', 'allergyClinicalInformation','is Allergy Fatal'];
  ngOnInit(): void {
    this.router.navigate(['/patient/dashboardpatient-dashboard-diaplay']);
    this.display='yes';
    this.loggedinUser = this.authservice.isLoggedIn();
   
    console.log(this.loggedinUser?.id);
    this.demographicService. getPatientDemographicsById(this.loggedinUser?.id).subscribe((data: any) => {
      this.patientDetails = data;

      if(this.patientDetails===null){
        this.selection='no';
        console.log(this.selection)
      }else{
        this.selection='yes';
        console.log(this.selection);
        this.dataSource=this.patientDetails.allergies;
      }
     });
    //  this.allergyService.getMasterAllergies().subscribe((data: any) => {
    //   this.masterAllergy = data;
    //   console.log(this.masterAllergy);
    // });
       
  }  
  navigateToPatientDetails(){
    this.display='';
    this.router.navigate(['/patient/dashboard/patient-demographic-details']);
  }
}
