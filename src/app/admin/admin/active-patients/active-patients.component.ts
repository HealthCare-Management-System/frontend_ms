import { Component, OnInit } from '@angular/core';
import { LockUnlockUsers } from 'src/app/models/lock-unlockUsers.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { CorporateRegisterationComponent } from '../../corporate-registeration/corporate-registeration.component';

@Component({
  selector: 'app-active-patients',
  templateUrl: './active-patients.component.html',
  styleUrls: ['./active-patients.component.css']
})
export class ActivePatientsComponent implements OnInit, AfterViewInit {
  constructor(private authservice: AuthServiceService, private dialog: MatDialog) {}

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

 

  changeStatusDeactive(element: any) {
    //alert(element);
    element.status = 'Deactive';

    console.log(element);
    this.authservice.updateUserStatus(element.id, element.status).subscribe((res) => {
      console.log(res);
      window.location.reload();
       this.authservice.getUsersBasedOnRoleAndStatus(element.role,"Active");
    });
   
  }

  changeStatusBlock(element: any) {
    //alert(element);
    element.status = 'Block';

    console.log(element);
    this.authservice.updateUserStatus(element.id, element.status).subscribe((res) => {
      console.log(res);
      window.location.reload();
      // this.authservice.getUsersBasedOnRoleAndStatus(element.role,element.status);
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
    return this.authservice.getUsersBasedOnRoleAndStatus("PATIENT","Active").subscribe((data: {}) => {
      this.lockUnlockUsers = data;
       
      console.log("Printing lockunlock"+this.lockUnlockUsers)
      this.dataSource = new MatTableDataSource(this.lockUnlockUsers);
      this.lockUnlockUsers.splice(0, 1);
    });
  }

  onRegistration(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "40%";

    this.dialog.open(CorporateRegisterationComponent,dialogConfig)
  }

}
