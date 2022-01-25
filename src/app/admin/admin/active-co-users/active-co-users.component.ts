import { Component, OnInit } from '@angular/core';
import { LockUnlockUsers } from 'src/app/models/lock-unlockUsers.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CorporateRegisterationComponent } from '../../corporate-registeration/corporate-registeration.component';
import { AdminService } from 'src/app/service/admin.service';
@Component({
  selector: 'app-active-co-users',
  templateUrl: './active-co-users.component.html',
  styleUrls: ['./active-co-users.component.css'],
})
export class ActiveCoUsersComponent implements OnInit, AfterViewInit {
  constructor(
    private authservice: AuthServiceService,
    private dialog: MatDialog,private adminService:AdminService
  ) {}

  strString!: String;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'position',
    'name',
    'role',
    'status',
    'MobileNo',
    'deactive',
    'block',
  ];

  lockUnlockUsers: any = [];
  ActiveUsers: any = [];
  //dataSource!: MatTableDataSource<LockUnlockUsers>;
  dataSource: any;
  listData!: MatTableDataSource<any>;

  onSearch() {
    this.dataSource.filter = this.strString;
  }


  changeStatusDeactive(element: any) {
    //alert(element);
    element.status = 'Deactive';

    console.log(element);
    this.authservice
      .updateUserStatus(element.id, element.status)
      .subscribe((res) => {
        console.log(res);
        window.location.reload();
       // this.authservice.getUsersBasedOnRoleAndStatus(element.role, 'Active');
      });
  }

  changeStatusBlock(element: any) {
    //alert(element);
    element.status = 'Block';

    console.log(element);
    this.authservice
      .updateUserStatus(element.id, element.status)
      .subscribe((res) => {
        console.log(res);
        window.location.reload();
        // this.authservice.getUsersBasedOnRoleAndStatus(element.role,element.status);
      });
  }

  ngOnInit() {
    this.dataSource= this.adminService.getData3();
    console.log("inside ng on it of active co users");
    
    console.log(this.dataSource);
    
  }
  ngAfterViewInit() {
   
  
    //this.dataSource = new MatTableDataSource(this.lockUnlockUsers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  // loadusers() {
  //   return this.authservice.getCorporateActiveUsers('Active').subscribe((data: {}) => {
  //     this.lockUnlockUsers = data;
  //     this.dataSource = new MatTableDataSource(this.lockUnlockUsers);
  //     this.lockUnlockUsers.splice(0, 1);
  //   });
  //   console.log('printing data');
  //   console.log(this.dataSource);

  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
    
  // }

  // onRegistration() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   // dialogConfig.width = "40%";

  //   this.dialog.open(CorporateRegisterationComponent, dialogConfig);
  // }
}
