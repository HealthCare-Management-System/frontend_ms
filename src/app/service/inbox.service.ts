import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import { APPOINTMENT} from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class InboxService {
  private userSubject: BehaviorSubject<APPOINTMENT | null> =
    new BehaviorSubject<any>(null);
  public loggedinUser: Observable<APPOINTMENT | null> =
    this.userSubject.asObservable();

  currentloggedinUser?: APPOINTMENT | null;

  apiURL = 'http://localhost:8080/appointmenturl/appointments/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  dataRow: any;

  constructor(private http: HttpClient) {}
   getBookingByPhysicianName(name:any):Observable<APPOINTMENT>{
     return this.http.get<APPOINTMENT>(this.apiURL+'app/'+name);
   }
  getBookingByPhysicianById(id:any):Observable<APPOINTMENT>{
    return this.http.get<APPOINTMENT>('http://localhost:8080/appointmenturl/appointments/physician/'+id);
  }
  getBookingByPatientById(id:any):Observable<APPOINTMENT>{
    return this.http.get<APPOINTMENT>('http://localhost:8080/appointmenturl/appointments/patient/'+id);
  }

  getAllBooking(): Observable<APPOINTMENT> {
    return this.http.get<APPOINTMENT>('http://localhost:8080/appointmenturl/appointments');
  }
   getBookingById(id:any){
     return this.http.get<APPOINTMENT>('http://localhost:8080/appointmenturl/appointments/'+id);
   }

  deleteById(appid: number) {
    console.log("we are in delete servise method ");
    console.log(appid);
    return this.http
      .delete<APPOINTMENT>(this.apiURL + appid, this.httpOptions)
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
