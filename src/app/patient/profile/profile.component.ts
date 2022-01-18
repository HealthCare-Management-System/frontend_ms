import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Allergy } from 'src/app/models/allergy.model';
import { Demographic } from 'src/app/models/demographic.model';
import { User } from 'src/app/models/user.model';
import { AllergyService } from 'src/app/service/allergy.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedinUser?:User|null;
  dataSource: any=[];
  selection:any;
  patientDetails:any;
  constructor(private authservice: AuthServiceService,public demographicService:DemographicService,public router: Router) { }

  ngOnInit(): void {
    this.loggedinUser=this.authservice.isLoggedIn();
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
  }
  edit(){
    this.router.navigate(['/patient/dashboard/patient-demographic-details-update']);
  }

}
