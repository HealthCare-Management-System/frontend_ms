import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onActivePatients() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(ActivePatientsComponent, dialogConfig);
  }

  onDeactivePatients() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(DeactivePatientsComponent, dialogConfig);
  }

  onBlockPatients() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(BlockPatientsComponent, dialogConfig);
  }

  onActiveUsers() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(ActiveCoUsersComponent, dialogConfig);
  }
  onDeactiveUsers() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(DeactiveCoUsersComponent, dialogConfig);
  }

  onBlockUsers() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(BlockCoUsersComponent, dialogConfig);
  }
}
