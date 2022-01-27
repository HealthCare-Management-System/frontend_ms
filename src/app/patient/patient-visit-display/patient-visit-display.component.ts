import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AllergyService } from 'src/app/service/allergy.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';
import { InboxService } from 'src/app/service/inbox.service';
import { PatientVisitServiceService } from 'src/app/service/patient-visit-service.service';
import { PatientInboxComponent } from '../patient-inbox/patient-inbox.component';
import { VisitListComponent } from '../visit-list/visit-list.component';

@Component({
  selector: 'app-patient-visit-display',
  templateUrl: './patient-visit-display.component.html',
  styleUrls: ['./patient-visit-display.component.css']
})
export class PatientVisitDisplayComponent implements OnInit {
  comingAppointment!:any;
  display!:string;
  max:number=0;
  recentVisit!:any;
  appointmentT!:boolean;
  loggedinUser?: User | null;
  selection!:string;
  patientDetails:any;
  dataSource: any=[];
  inboxdata:any=[];
  todayAppointment: any;
  dataSource2:any=[];
  length!:number;
  hasHistory!:boolean;
  constructor( private authservice: AuthServiceService,
     public demographicService: DemographicService, 
     public allergyService: AllergyService,
     public router: Router,
     public inboxservice:InboxService,
     public dialog: MatDialog,
     public patientVisitServiceService:PatientVisitServiceService) { }
  displayedColumns1:string[]=['allergyType', 'allergyName', 'allergyDescription', 'allergyClinicalInformation','is Allergy Fatal'];
  ngOnInit(): void {
    this.router.navigate(['/patient/dashboardpatient-dashboard-diaplay']);
    this.display='yes';
    this.loggedinUser = this.authservice.isLoggedIn();
   
    console.log(this.loggedinUser?.id);
    this.demographicService. getPatientDemographicsById(this.loggedinUser?.id).subscribe((data: any) => {
      this.patientDetails = data;
      this.loadAppointments(this.patientDetails.id);
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
    //  this.allergyService.getMasterAllergies().subscribe((data: any) => {
    //   this.masterAllergy = data;
    //   console.log(this.masterAllergy);
    // });
       
  }  
  navigateToPatientDetails(){
    this.display='';
    this.router.navigate(['/patient/dashboard/patient-demographic-details']);
  }
  loadAppointments(id:number|undefined){
    this.inboxservice.getBookingByPatientById(id).subscribe((data) => {
      this.inboxdata = data;   
      console.log(this.inboxdata);
      this.getComingAppointment(this.inboxdata);
      this.getTodayAppointment(this.inboxdata);
    });
  }
  getTodayAppointment(inboxdata: any) {
    for(var i of inboxdata){
      let d1=new Date(i.appointmentDate).getDate();
      console.log(d1-1);
      let t = new Date().getDate();
      console.log(t);
      if((d1-1)===t){
        this.todayAppointment=i;
        this.appointmentT=true;
        console.log(this.todayAppointment);
        break;
      }
    }
    if(this.todayAppointment===undefined){
      this.appointmentT=false;
    }
   
  }
  getComingAppointment(inboxdata: any) {
    //console.log(inboxdata.length());
    for(var i of inboxdata){
      console.log(i.appointmentDate);
      let d1=new Date(i.appointmentDate).getDate();
      console.log(d1);
      let t = new Date().getDate();
      console.log(t);
      if(d1>t){
       this.comingAppointment=i;
        console.log(i.appointmentDate);
        console.log(i.physicianIdInfo.name);
        console.log(i);
        break;
      }
    }
  }
  getVisitPatientList(id:number) {
    this.patientVisitServiceService.getPatientVisitInfoByPatientId(id).subscribe((data) => {
      this.dataSource2 = data;
      this.getLatestVisitDetails(this.dataSource2);
      console.log("********************inside patient visdit data*************************************")
      console.log(this.dataSource2);
      if(this.dataSource2.length===0){
        console.log("don't have visit history");
        this.hasHistory=false;
        this.length=this.dataSource2.length;
      }else{
        console.log("have visit list");
        this.hasHistory=true;
        this.length=this.dataSource2.length;
      }
    });
  }
  getLatestVisitDetails(dataSource2: any) {
    for(var d of dataSource2){
      if(d.id>this.max){
        this.max=d.id;
      }
    }
    this.recentVisits(this.max,dataSource2);
  }
  recentVisits(max: number,dataSource2:any) {
    for(var d of dataSource2){
      if(max===d.id){
       this.recentVisit=d;
      }
    }
  }
  showListOfVisits(){
    const dialogRef =this.dialog.open(VisitListComponent, {height:'50%',width:'100%'});
  }
  showInbox(){
    const dialogRef =this.dialog.open(PatientInboxComponent, {height:'50%',width:'100%'});
  }
}
