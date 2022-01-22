import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { PatientVisit } from '../models/patientvisit.model';

@Injectable({
  providedIn: 'root'
})
export class PatientVisitServiceService {


  apiURL = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(private http: HttpClient) {}


  savePatientVisit(patientVisit:PatientVisit): Observable<PatientVisit> {
    return this.http.post<PatientVisit>(this.apiURL + 'patientvisiturl/patientvisitinfo', JSON.stringify(patientVisit), this.httpOptions)
    .pipe(
     retry(1),
      catchError(this.handleError)
    )
  } 


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
