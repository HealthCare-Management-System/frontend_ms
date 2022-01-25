
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medication } from '../models/Medication.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginModel } from '../models/login.model';
import { LoginResponseModel } from '../models/loginResponse.model';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';
import jwt_decode from 'jwt-decode';
import { lastValueFrom } from 'rxjs';

import { Diagnosis } from '../models/Diagnosis.model';
import { Procedure } from '../models/procedure.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiURL = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    
  ) {}

  dataSource23: any;
  dataSource24:any;
  dataSource25:any;
  dataSource26:any;
  dataSource27:any;
  dataSource28:any;



  getUsersBasedOnRoleAndStatus(role: string, status: string): Observable<User> {
    return this.http
      .get<User>(this.apiURL + 'userurl/users/' + role + '/' + status)
      .pipe(retry(1), catchError(this.handleError));
  }

  setData(data:any){
    this.dataSource23=data;
    console.log("inside set data");
    console.log(this.dataSource23);
    

  }
  getData(){
    console.log("inside get data");
    console.log(this.dataSource23);
return this.dataSource23;
  }

  setData1(data:any){
    this.dataSource24=data;
    console.log("inside set deactive data");
    console.log(this.dataSource24);
    

  }
  getData1(){
    console.log("inside get data");
    console.log(this.dataSource24);
return this.dataSource24;
  }

  setData2(data:any){
    this.dataSource25=data;
    console.log("inside set deactive data");
    console.log(this.dataSource24);
    

  }
  getData2(){
    console.log("inside get data");
    console.log(this.dataSource25);
return this.dataSource25;
  }

  setData3(data:any){
    this.dataSource26=data;
    console.log("inside set deactive data");
    console.log(this.dataSource26);
    

  }
  getData3(){
    console.log("inside get data3 for active corporate user");
    console.log(this.dataSource26);
return this.dataSource26;
  }
  setData4(data:any){
    this.dataSource27=data;
    console.log("inside set deactive data");
    console.log(this.dataSource27);
    

  }
  getData4(){
    console.log("inside get data");
    console.log(this.dataSource27);
return this.dataSource27;
  }
  setData5(data:any){
    this.dataSource28=data;
    console.log("inside set deactive data");
    console.log(this.dataSource28);
    

  }
  getData5(){
    console.log("inside get data");
    console.log(this.dataSource28);
return this.dataSource28;
  }

 



  addProcedure(ob: Procedure) : Observable<Procedure> {
    return this.http
      .post<Procedure>(
        this.apiURL + 'patientvisiturl/procedure',
        JSON.stringify(ob),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  addDiagnosis(ob: Diagnosis): Observable<Diagnosis> {
    return this.http
      .post<Diagnosis>(
        this.apiURL + 'patientvisiturl/diagnosis',
        JSON.stringify(ob),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  addMedication(ob: Medication): Observable<Medication> {
    return this.http 
      .post<Medication>(
        this.apiURL + 'patientvisiturl/medication',
        JSON.stringify(ob),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

// To display the diagnosis master data to display in Admin module 
  getDiagnosisData() {
    return this.http
      .get<Diagnosis>(this.apiURL + 'patientvisiturl/diagnosis')
      .pipe(retry(1), catchError(this.handleError));
  }


  getProcedureData() {
    return this.http
      .get<Procedure>(this.apiURL + 'patientvisiturl/procedure')
      .pipe(retry(1), catchError(this.handleError));
  }
  getMedicationData() {
    return this.http
      .get<Medication>(this.apiURL + 'patientvisiturl/medication')
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
