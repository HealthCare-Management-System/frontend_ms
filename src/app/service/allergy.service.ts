import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Allergy,  MasterAllergy } from '../models/allergy.model';
//import { User } from '../models/user.model';
@Injectable({ providedIn: 'root' })
export class AllergyService {
    
    apiURL = 'http://localhost:8080/patienturl';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }  
    
      constructor(private http: HttpClient) {} 
     
      saveAllergy(allergy:Allergy[]): Observable<Allergy[]> {
        return this.http.post<Allergy[]>('http://localhost:8080/allergy', JSON.stringify(allergy), this.httpOptions)
        .pipe(
         retry(1),
          catchError(this.handleError)
        )
      }  
      deleteAllergiesByPatientId(id: number|undefined) {
        return this.http
          .delete<Allergy>('http://localhost:8080/patienturl/allergy/allergies/' + id, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
      }
      getAllergies(): Observable<Allergy> {
        return this.http
          .get<Allergy>('http://localhost:8080/allergy')
          .pipe(retry(1), catchError(this.handleError));
      }
      getMasterAllergies(): Observable<MasterAllergy> {
        return this.http
          .get<MasterAllergy>('http://localhost:8080/patienturl/masterAllergy')
          .pipe(retry(1), catchError(this.handleError));
      }
      deleteAllergy(id: number) {
        return this.http
          .delete<Allergy>('http://localhost:8080/patienturl/allergy/' + id, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
      }
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

