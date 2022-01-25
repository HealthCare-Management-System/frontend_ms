import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientVisitServiceService } from 'src/app/service/patient-visit-service.service';

@Component({
  selector: 'app-patient-visit-info',
  templateUrl: './patient-visit-info.component.html',
  styleUrls: ['./patient-visit-info.component.css']
})
export class PatientVisitInfoComponent implements OnInit {
  patientVisitInfo!:any;
dataSource!:any;
selectedVisitId!:any;
  constructor(private patientVisitService:PatientVisitServiceService,
    private route: ActivatedRoute,private router:Router,
    ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {

      this.selectedVisitId = params.get('meetingid');


      // this.getVisitId(Number(this.selectedVisitId));
      this.patientVisitInfo=this.patientVisitService.getComponent();
    });
  }
  
  getVisitId(id:number){
    this.patientVisitService.getPatientVisitInfoById(id).subscribe((data: any) => {
      this.patientVisitInfo = data;
     console.log(this.patientVisitInfo);
    });
  }
  navigatingToInbox(){
    this.router.navigate(['patient/dashboard/patient-inbox']);
  }
  click(){
    
  }

}
