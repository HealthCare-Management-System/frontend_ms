import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-shared-profile',
  templateUrl: './shared-profile.component.html',
  styleUrls: ['./shared-profile.component.css']
})
export class SharedProfileComponent implements OnInit {
  @Input()
  selection:any;
  @Input()
  dataSource: any=[];

  @Input()
  public loggedinUser?:User|null;
  @Input()
  public patientDetails:any;
  constructor(public router: Router) { }
  displayedColumns1:string[]=['allergyType', 'allergyName', 'allergyDescription', 'allergyClinicalInformation','is Allergy Fatal'];
  
  ngOnInit(): void {
  }
  edit(){
    this.router.navigate(['/patient/dashboard/patient-demographic-details-update']);
  }

}
