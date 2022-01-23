import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { VitalSign } from '../models/vitalsigns.model';



@Injectable({
  providedIn: 'root',
})
export class VitalSignService {
  // users: User[] = [];
  // loggedinUser?: User;

  apiURL = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(private http: HttpClient) {}


  // getUsers(): Observable<User> {
  //   return this.http.get<User>(this.apiURL + '/users')
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  
  getVitalSignByPatientId(id:number|undefined): Observable<VitalSign> {
    return this.http.get<VitalSign>(this.apiURL + 'vitalsignurl/vitalsigns/patient/' + id);
  
    
  }  

 
  saveVitalSign(vitalsign:VitalSign): Observable<VitalSign> {
    return this.http.post<VitalSign>(this.apiURL + 'vitalsignurl/vitalsigns', JSON.stringify(vitalsign), this.httpOptions)
    .pipe(
     retry(1),
      catchError(this.handleError)
    )
  }  

  // updateUser(id:number, user:User): Observable<User> {
  //   return this.http.put<User>(this.apiURL + '/users/' + id, JSON.stringify(user), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  
  // deleteEmployee(id:number){
  //   return this.http.delete<User>(this.apiURL + '/users/' + id, this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // Error handling 
  handleError(error:any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
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















