import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry } from 'rxjs';
import { APPOINTMENT } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
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

  constructor(private http: HttpClient) {}

  createBook(book: APPOINTMENT): Observable<APPOINTMENT> {
    console.log('save booking' + book);
    return this.http.post<APPOINTMENT>(
      'http://localhost:8080/appointmenturl/appointments/save',
      JSON.stringify(book),
      this.httpOptions
    );
  }
  getBookingByPatient(id: any): Observable<APPOINTMENT> {
    return this.http.get<APPOINTMENT>(this.apiURL + 'patient/' + id);
  }

  getAppointmentById(id: Number): Observable<APPOINTMENT> {
    return this.http.get<APPOINTMENT>(this.apiURL + id, this.httpOptions);
  }
}
