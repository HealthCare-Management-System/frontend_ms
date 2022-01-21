import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Demographic } from 'src/app/models/demographic.model';
import { User } from 'src/app/models/user.model';
import { AllergyService } from 'src/app/service/allergy.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';
import { distinct } from 'rxjs/operators';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  
  loggedinUser?: User | null;
  selection!:string;
  patientDetails:any;
  masterAllergy:any;
  constructor(public dialog: MatDialog, private authservice: AuthServiceService, public demographicService: DemographicService, public allergyService: AllergyService) { }

  ngOnInit(): void {
    
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
      }
     });
    //  this.allergyService.getMasterAllergies().subscribe((data: any) => {
    //   this.masterAllergy = data;
    //   console.log(this.masterAllergy);
    // });
       
  }  
}