import { Component, OnInit } from '@angular/core';
import { LockUnlockUsers } from 'src/app/models/lock-unlockUsers.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-block-patients',
  templateUrl: './block-patients.component.html',
  styleUrls: ['./block-patients.component.css']
})
export class BlockPatientsComponent implements OnInit, AfterViewInit {
  constructor(private authservice: AuthServiceService,private adminService:AdminService) {}

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
    'deactive',
    
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
      // this.authservice.getUsersBasedOnRoleAndStatus(element.role,element.status);
    });
  }

  changeStatusActive(element: any) {
    //alert(element);
    element.status = 'Active';

    console.log(element);
    this.authservice.updateUserStatus(element.id, element.status).subscribe((res) => {
      console.log(res);
      window.location.reload();
      // this.authservice.getUsersBasedOnRoleAndStatus(element.role,element.status);
    });
  }


  ngOnInit(): void {
    //this.loadusers();
   
this.dataSource=this.adminService.getData2();
console.log("printing data inside bloack patient ngonit")
console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  // loadusers() {
  //   return this.authservice.getUsersBasedOnRoleAndStatus("CT_PATIENT","Block").subscribe((data: {}) => {
  //     this.lockUnlockUsers = data;
       
  //     console.log("Printing lockunlock"+this.lockUnlockUsers)
  //     this.dataSource = new MatTableDataSource(this.lockUnlockUsers);
  //     this.lockUnlockUsers.splice(0, 1);
  //   });
  // }

}

