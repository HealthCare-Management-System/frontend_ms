import { Injectable } from '@angular/core';

import { scheduler } from '../models/Scheduler.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginModel } from '../models/login.model';
import { LoginResponseModel } from '../models/loginResponse.model';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';
import jwt_decode from 'jwt-decode';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SchedulerService {



  apiURL = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    
  ) {}



  private listOfScheduledAppoinments: scheduler[] = [];
 

 

  getAllListOfAppointments1(): Observable<scheduler> {
    console.log("inside the getAll list of appointment method");
    
    return this.http
      .get<scheduler>(this.apiURL + '/scheduledAppintment')
      .pipe(retry(1), catchError(this.handleError));
  }

  saveAllergy(allergy:scheduler[]): Observable<scheduler[]> {
    return this.http.post<scheduler[]>('http://localhost:8080/scheduledAppintment', JSON.stringify(allergy), this.httpOptions)
    .pipe(
     retry(1),
      catchError(this.handleError)
    )
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


  addPost(post: scheduler) {
    // this.listOfPosts.push(post);
    this.http
      .post('http://localhost:8080/scheduledAppintment', post)
      .subscribe((res) => {
        console.log(res);
        this.fetchFromBackend();
      });
  }

  updatePost(index: number, updatedPost: scheduler) {
    this.listOfScheduledAppoinments[index] = updatedPost;
  }


  deletePost(post: scheduler) {
    // this.listOfPosts.splice(index, 1);

    this.http
      .delete(
        'http://localhost:8080/scheduledAppintment' 
         
      )
      .subscribe((res) => {
        console.log(res);
        this.fetchFromBackend();
      });
  }


  fetchFromBackend() {
    this.http
      .get<scheduler[]>('http://localhost:8080/scheduledAppintment')
      .subscribe((res: scheduler[]) => {
        // Deleting onject inside the array
        this.listOfScheduledAppoinments.splice(0, this.listOfScheduledAppoinments.length);
        console.log('This method id getting called ...');
        // Pushing objects
        this.listOfScheduledAppoinments.push(...res);

        console.log("Hello listof Posts"+this.listOfScheduledAppoinments);

        // this.listOfPosts.push(res[0])
        // this.listOfPosts.push(res[1])
        // this.listOfPosts.push(res[2])
      });
  }
  
}
