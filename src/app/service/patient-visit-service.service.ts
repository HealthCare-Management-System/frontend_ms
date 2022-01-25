import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { PatientVisit } from '../models/patientvisit.model';

@Injectable({
  providedIn: 'root',
})
export class PatientVisitServiceService {
  apiURL = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public patientVisit = new PatientVisit();
  setComponent(p: PatientVisit | any) {
    this.patientVisit = p;
  }
  getComponent() {
    return this.patientVisit;
  }

  constructor(private http: HttpClient) {}

  savePatientVisit(patientVisit: PatientVisit): Observable<PatientVisit> {
    return this.http
      .post<PatientVisit>(
        this.apiURL + 'patientvisiturl/patientvisitinfo',
        JSON.stringify(patientVisit),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getPatientVisitList(): Observable<PatientVisit> {
    return this.http

      .get<PatientVisit>(
        'http://localhost:8080/patientvisiturl/patientvisitinfo'
      )

      .pipe(retry(1), catchError(this.handleError));
  }

  getPatientVisitInfoByPatientId(
    id: number | null | undefined
  ): Observable<PatientVisit> {
    return this.http

      .get<PatientVisit>(
        'http://localhost:8080/patientvisiturl/patientvisitinfo/patient/' + id
      )

      .pipe(retry(1), catchError(this.handleError));
  }

  getPatientVisitInfoById(
    id: number | null | undefined
  ): Observable<PatientVisit> {
    return this.http

      .get<PatientVisit>(
        'http://localhost:8080/patientvisiturl/patientvisitinfo/' + id
      )

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
