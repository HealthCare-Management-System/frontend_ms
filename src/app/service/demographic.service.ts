import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {Demographic} from '../models/demographic.model';
import { PatientDetails } from '../models/PatientDetails.model';
import { User } from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class DemographicService {
    apiURL = 'http://localhost:8080/patienturl/patientdetails';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      constructor(private http: HttpClient) {}  
    saveDemographic(demographic:Demographic): Observable<Demographic> {
      console.log("from services");
      console.log(demographic);
        return this.http.post<Demographic>('http://localhost:8080/demographic', JSON.stringify(demographic), this.httpOptions)
        .pipe(
         retry(1),
          catchError(this.handleError)
        )
      } 
      
      savePatientDemographic(demographic:PatientDetails): Observable<PatientDetails> {
        console.log("from services");
        console.log(demographic);
          return this.http.post<PatientDetails>(this.apiURL, JSON.stringify(demographic), this.httpOptions)
          .pipe(
           retry(1),
            catchError(this.handleError)
          )
        } 
        
        getPatientDemographics(): Observable<PatientDetails> {
          return this.http
            .get<PatientDetails>('http://localhost:8080/PatientDetails')
            .pipe(retry(1), catchError(this.handleError));
        }
        getPatientDemographicsById(userId:number|null|undefined): Observable<PatientDetails> {
          return this.http
            .get<PatientDetails>('http://localhost:8080/patienturl/patientdetails/user/'+userId)
            .pipe(retry(1), catchError(this.handleError));
        }
        
        getUser(id: number): Observable<User> {
          return this.http
            .get<User>(this.apiURL + '/persons/' + id)
            .pipe(retry(1), catchError(this.handleError));
        }
      
      // getDemographics(): Observable<Demographic> {
      //   return this.http
      //     .get<Demographic>('http://localhost:8080/demographic')
      //     .pipe(retry(1), catchError(this.handleError));
      // }
      // updateDemographic(id: number|undefined, demo: Demographic): Observable<Demographic> {
      //   console.log("from update demographic service");
      //   console.log(demo);
      //   return this.http
      //     .patch<Demographic>(
      //       'http://localhost:8080/demographic/' + id,
      //       JSON.stringify(demo),
      //       this.httpOptions
      //     )
      //     .pipe(retry(1), catchError(this.handleError));
      // }
      updatePatientDetails(id: number|undefined, demo:PatientDetails ): Observable<PatientDetails> {
        console.log("from update PatientDetails service");
        console.log(demo);
        console.log(id);
        return this.http
          .patch<PatientDetails>(
            'http://localhost:8080/patienturl/patientdetails/update/' + id,
            JSON.stringify(demo),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
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

