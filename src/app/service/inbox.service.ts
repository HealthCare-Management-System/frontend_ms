import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import { APPOINTMENT, VITAL_SIGNS } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class InboxService {
  private userSubject: BehaviorSubject<APPOINTMENT | null> =
    new BehaviorSubject<any>(null);
  public loggedinUser: Observable<APPOINTMENT | null> =
    this.userSubject.asObservable();

  currentloggedinUser?: APPOINTMENT | null;

  apiURL = 'http://localhost:8080/appointments/';

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
  getBookingByPhysician(id:any):Observable<APPOINTMENT>{
    return this.http.get<APPOINTMENT>(this.apiURL+'physician/'+id);
  }

  getAllBooking(): Observable<APPOINTMENT> {
    return this.http.get<APPOINTMENT>(this.apiURL);
  }
   getBookingById(id:any){
     return this.http.get<APPOINTMENT>(this.apiURL+id);
   }

  deleteById(id: number) {
    return this.http
      .delete<APPOINTMENT>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
   getVitalSignsByPatientId(id:any):Observable<VITAL_SIGNS>{
     return this.http.get<VITAL_SIGNS>('http://localhost:8080/vitalsigns/patient/'+id);
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
