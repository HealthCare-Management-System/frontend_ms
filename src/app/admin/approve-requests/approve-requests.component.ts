import { Component, OnInit } from '@angular/core';
import { LockUnlockUsers } from 'src/app/models/lock-unlockUsers.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-aaprove-requests',
  templateUrl: './approve-requests.component.html',
  styleUrls: ['./approve-requests.component.css'],
})
export class ApproveRequestsComponent implements OnInit, AfterViewInit {
  constructor(private authservice: AuthServiceService) {}

  strString!: String;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'email', 'dor', 'request'];

  listOfUsers: any = [];
  //dataSource!: MatTableDataSource<listOfUsers>;
  dataSource: any;

  onSearch() {
    this.dataSource.filter = this.strString;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  approveRequest(element: any) {
    //alert(element);
    element.status = 'Active';

    console.log(element);
    this.authservice.updateUserStatus(element.id, element.status).subscribe();
  }

  ngOnInit(): void {
    this.loadusers();
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadusers() {
    return this.authservice.getUsersBasedOnRoleAndStatus("PATIENT","NotApproved").subscribe((data: {}) => {
      this.listOfUsers = data;
      this.dataSource = new MatTableDataSource(this.listOfUsers);
      this.listOfUsers.splice(0, 1);
    });
  }
}
