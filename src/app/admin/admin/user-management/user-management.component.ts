import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ActiveCoUsersComponent } from '../active-co-users/active-co-users.component';
import { ActivePatientsComponent } from '../active-patients/active-patients.component';
import { BlockCoUsersComponent } from '../block-co-users/block-co-users.component';
import { BlockPatientsComponent } from '../block-patients/block-patients.component';
import { DeactiveCoUsersComponent } from '../deactive-co-users/deactive-co-users.component';
import { DeactivePatientsComponent } from '../deactive-patients/deactive-patients.component';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  constructor(private dialog: MatDialog,private authservice: AuthServiceService,private adminService:AdminService) {}
  
  dataSource23: any;

  dataSource24: any;

  dataSource25: any;
  dataSource26: any;
  dataSource27: any;
  dataSource28: any;

  ngOnInit(): void {
    this.loadusers();
   this.loadDeactivePatients();
   this.loadBlockPatients();
   this.loadActiveUsers();
   this.loadDeactiveUsers();
   this.loadBlockUsers();
  }


  loadusers() {
    return this.adminService.getUsersBasedOnRoleAndStatus("CT_PATIENT","Active").subscribe((data: {}) => {
    this.dataSource23 =data;
      console.log("Inside load user of user management");
      console.log(data);
      
      
    });
  }

  loadDeactivePatients() {
    return this.adminService.getUsersBasedOnRoleAndStatus("CT_PATIENT","Deactive").subscribe((data: {}) => {
      this.dataSource24 =data;
      console.log("Inside load user of user management for deactive patients");
      console.log(data);
      
      
    });
  }


  loadBlockPatients(){
    return this.adminService.getUsersBasedOnRoleAndStatus("CT_PATIENT","Block").subscribe((data: {}) => {
      this.dataSource25 =data;
      console.log("Inside load user of user management for block patients");
      console.log(data);
      
      
    });

  }


  
  loadActiveUsers(){
    return this.authservice.getCorporateActiveUsers('Active').subscribe((data: {}) => {
      this.dataSource26 =data;
      console.log("Inside load user of user management for Active corporate users");
      console.log(data);
      
      
    });

  }
  
  loadDeactiveUsers(){
    return this.authservice.getCorporateActiveUsers('Deactive').subscribe((data: {}) => {
      this.dataSource27 =data;
      console.log("Inside load user of user management for Deactive corporate users");
      console.log(data);
      
      
    });

  }
  
  loadBlockUsers(){
    return this.authservice.getCorporateActiveUsers('Block').subscribe((data: {}) => {
      this.dataSource28 =data;
      console.log("Inside load user of user management for block corporate users");
      console.log(data);
      
      
    });

  }
  onActivePatients() {
    this.adminService.setData(this.dataSource23);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(ActivePatientsComponent,dialogConfig);
  }

  onDeactivePatients() {
    this.adminService.setData1(this.dataSource24);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(DeactivePatientsComponent, dialogConfig);
  }

  onBlockPatients() {
    this.adminService.setData2(this.dataSource25);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(BlockPatientsComponent, dialogConfig);
  }

  onActiveUsers() {
    this.adminService.setData3(this.dataSource26);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(ActiveCoUsersComponent, dialogConfig);
  }
  onDeactiveUsers() {
    this.adminService.setData4(this.dataSource27);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(DeactiveCoUsersComponent, dialogConfig);
  }

  onBlockUsers() {
    this.adminService.setData5(this.dataSource28);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(BlockCoUsersComponent, dialogConfig);
  }
}
