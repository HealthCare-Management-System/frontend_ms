import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';
import { PatientVisitServiceService } from 'src/app/service/patient-visit-service.service';
@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

   
  dataSource: any=[];
  dataSource2:any=[];
  loggedinUser?:User|null;
  hasHistory!:boolean;
  selection:any;
  patientDetails:any;
  constructor(private authservice: AuthServiceService,
    public demographicService:DemographicService,
    public router: Router,
    public patientVisitServiceService:PatientVisitServiceService,
    ) { }

  ngOnInit(): void {
    
    this.loggedinUser=this.authservice.isLoggedIn();
    this.demographicService. getPatientDemographicsById(this.loggedinUser?.id).subscribe((data: any) => {
      this.patientDetails = data;
      console.log(this.patientDetails);
      console.log(this.patientDetails.id);
      this.getVisitPatientList(this.patientDetails.id);
      if(this.patientDetails===null){
        this.selection='no';
        console.log(this.selection)
      }else{
        this.selection='yes';
        console.log(this.selection);
        this.dataSource=this.patientDetails.allergies;
      }
     });
  }
  edit(){
    this.router.navigate(['/patient/dashboard/patient-demographic-details-update']);
  }
  getVisitPatientList(id:number) {
    this.patientVisitServiceService.getPatientVisitInfoByPatientId(id).subscribe((data) => {
      this.dataSource2 = data;
      console.log("********************inside patient visdit data*************************************")
      console.log(this.dataSource2);
      if(this.dataSource2.length===0){
       // console.log("don't have visit history");
        this.hasHistory=false;
      }else{
       // console.log("have visit list");
        this.hasHistory=true;
      }
    });
  }


}
