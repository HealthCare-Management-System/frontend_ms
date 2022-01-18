import { Component, OnInit } from '@angular/core';
import { LockUnlockUsers } from 'src/app/models/lock-unlockUsers.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.css'],
})
export class PatientManagementComponent implements OnInit, AfterViewInit {
  constructor(private authservice: AuthServiceService) {}

  strString!: String;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'position',
    'name',
    'doj',
    'status',
    'role',
    'Deactive',
    'Block',
  ];
  displayedColumns_1: string[] = [
    'position',
    'name',
    'doj',
    'status',
    'role',
    'Active',
    'Block',
  ];
  displayedColumns_2: string[] = [
    'position',
    'name',
    'doj',
    'status',
    'role',
    'Active',
    'Deactive',
  ];

  lockUnlockUsers: any = [];
  //dataSource!: MatTableDataSource<LockUnlockUsers>;
  dataSource: any;

  onSearch() {
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
    this.authservice.updateUserStatus(element.id, element.status).subscribe();
  }

  changeStatusDeactive(element: any) {
    //alert(element);
    element.status = 'Deactive';

    console.log(element);
    this.authservice.updateUserStatus(element.id, element.status).subscribe();
  }

  changeStatusBlock(element: any) {
    //alert(element);
    element.status = 'Block';

    console.log(element);
    this.authservice.updateUserStatus(element.id, element.status).subscribe();
  }

  ngOnInit(): void {
    console.log('Inside patient management');
    this.loadusers();
    console.log('All Data');
    console.log(this.dataSource);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadusers() {
    return this.authservice.getUsers().subscribe((data: {}) => {
      this.lockUnlockUsers = data;
      this.dataSource = new MatTableDataSource(this.lockUnlockUsers);
      this.lockUnlockUsers.splice(0, 1);
    });
  }
}
