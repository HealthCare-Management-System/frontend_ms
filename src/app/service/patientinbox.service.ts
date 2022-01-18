import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { APPOINTMENT } from "../models/appointment.model";

@Injectable({ providedIn: 'root' })
export class PatientInboxService {
  private userSubject: BehaviorSubject<APPOINTMENT|null> = new BehaviorSubject<any>(null);
  public loggedinUser: Observable<APPOINTMENT|null> = this.userSubject.asObservable();

  currentloggedinUser?:APPOINTMENT | null;

  apiURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  
  getAllBooking(): Observable<APPOINTMENT> {
    return this.http
      .get<APPOINTMENT>(this.apiURL + '/appointment');
      }
}