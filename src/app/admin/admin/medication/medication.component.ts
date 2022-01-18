import { Component, OnInit } from '@angular/core';
import { LockUnlockUsers } from 'src/app/models/lock-unlockUsers.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CorporateRegisterationComponent } from '../../corporate-registeration/corporate-registeration.component';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css'],
})
export class MedicationComponent implements OnInit, AfterViewInit {
  constructor(
    private authservice: AuthServiceService,
    private dialog: MatDialog
  ) {}

  strString!: String;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'drugName', 'drugGenericName', 'drugBrandName','drugForm','drugStrength','request'];

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
    return this.authservice
      .getUsersBasedOnRoleAndStatus('PATIENT', 'NotApproved')
      .subscribe((data: {}) => {
        this.listOfUsers = data;
        this.dataSource = new MatTableDataSource(this.listOfUsers);
        this.listOfUsers.splice(0, 1);
      });
  }

  onRegistration() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "40%";

    this.dialog.open(AddMedicationComponent, dialogConfig);
  }
}
