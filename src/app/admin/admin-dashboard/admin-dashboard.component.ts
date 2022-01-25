import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor( private authservice: AuthServiceService, public router: Router) { }

  loggedinUser?:User|null;

  ngOnInit(): void {

    this.loggedinUser=this.authservice.isLoggedIn();
        
  }

  routeinmethod(){
    this.router.navigate(['admin/dashboard/patient-diagnosis'], { queryParams: { username: 'randomUser'} });
  }
  topatientvisitinfo(){
    this.router.navigate(['admin/dashboard/patient-visit-info'])
  }

}
