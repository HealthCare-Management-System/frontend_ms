import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AllergyService } from 'src/app/service/allergy.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';
import { InboxService } from 'src/app/service/inbox.service';
import { PatientVisitServiceService } from 'src/app/service/patient-visit-service.service';


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
  dataSource2:any=[];
  dataSource: any=[];
  hasHistory!:boolean;
  inboxdata!:any;
  constructor( private authservice: AuthServiceService,
     public demographicService: DemographicService, 
     public allergyService: AllergyService,
     public router: Router,
     public inboxservice:InboxService,
    public patientVisitServiceService:PatientVisitServiceService) { }
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
        this.getVisitPatientList(this.patientDetails.id);
        this.dataSource=this.patientDetails.allergies;
      }
     });    
  }  
  navigateToPatientDetails(){
    this.display='';
    this.router.navigate(['/patient/dashboard/patient-demographic-details']);
  }
  
  getVisitPatientList(id:number) {
    this.patientVisitServiceService.getPatientVisitInfoByPatientId(id).subscribe((data) => {
      this.dataSource2 = data;
      console.log("********************inside patient visdit data*************************************")
      console.log(this.dataSource2);
      if(this.dataSource2.length===0){
        console.log("don't have visit history");
        this.hasHistory=false;
      }else{
        console.log("have visit list");
        this.hasHistory=true;
      }
    });
}
}