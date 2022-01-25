import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientVisitServiceService } from 'src/app/service/patient-visit-service.service';
import { PatientVisitInfoComponent } from '../patient-visit-info/patient-visit-info.component';

@Component({
  selector: 'app-patient-visit-info-list',
  templateUrl: './patient-visit-info-list.component.html',
  styleUrls: ['./patient-visit-info-list.component.css']
})
export class PatientVisitInfoListComponent implements OnInit {

  
  @Input()
  dataSource!: any;
  @Input()
  patientInfoId!:any;
  @Input()
  displayedColumns: string[] = ['PatientName', 'PhysicianName', 'VisitDate', 'Procedures','Medication','view'];
  constructor(public router:Router,public dialog: MatDialog,private patientVisitService: PatientVisitServiceService) { }

  ngOnInit(): void {
  }
  getPatientVisitinfo(element:any){
    this.patientVisitService.setComponent(element);
      const dialogRef =this.dialog.open(PatientVisitInfoComponent, {height:'100%',width:'100%'});
  }
}
