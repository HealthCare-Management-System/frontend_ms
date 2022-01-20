import { Component, OnInit } from '@angular/core';
import { LockUnlockUsers } from 'src/app/models/lock-unlockUsers.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-deactive-patients',
  templateUrl: './deactive-patients.component.html',
  styleUrls: ['./deactive-patients.component.css']
})
export class DeactivePatientsComponent implements OnInit, AfterViewInit {
  constructor(private authservice: AuthServiceService) {}

  strString!: String;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  

  displayedColumns: string[] = [
    'position',
    'name',
    'role',
    'status',
    'MobileNo',
    'active',
    'block'
  ];



  lockUnlockUsers: any = [];
  ActiveUsers: any = [];
  //dataSource!: MatTableDataSource<LockUnlockUsers>;
  dataSource: any;

  onSearch(){
    
    this.dataSource.filter = this.strString;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 

  changeStatusActive(element: any) {
    //alert(element);
    element.status = 'Active';

    console.log(element);
    this.authservice.updateUserStatus(element.id, element.status).subscribe((res) => {
      console.log(res);
      this.authservice.getUsersBasedOnRoleAndStatus(element.role,element.status);
      window.location.reload();
    });
  }

  changeStatusBlock(element: any) {
    //alert(element);
    element.status = 'Block';

    console.log(element);
    this.authservice.updateUserStatus(element.id, element.status).subscribe((res) => {
      console.log(res);
      this.authservice.getUsersBasedOnRoleAndStatus(element.role,element.status);
      window.location.reload();
    });
  }


  ngOnInit(): void {
    this.loadusers();
    console.log("printing data")
    console.log(this.dataSource);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadusers() {
    return this.authservice.getUsersBasedOnRoleAndStatus("CT_PATIENT","Deactive").subscribe((data: {}) => {
      this.lockUnlockUsers = data;
       
      console.log("Printing lockunlock"+this.lockUnlockUsers)
      this.dataSource = new MatTableDataSource(this.lockUnlockUsers);
      this.lockUnlockUsers.splice(0, 1);
    });
  }

}
