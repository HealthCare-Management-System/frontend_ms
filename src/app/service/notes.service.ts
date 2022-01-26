import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  pipe,
  retry,
  throwError,
} from 'rxjs';
import { APPOINTMENT } from '../models/appointment.model';
import { NOTES } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private userSubject: BehaviorSubject<NOTES | null> = new BehaviorSubject<any>(null);
  public loggedinUser: Observable<NOTES | null> = this.userSubject.asObservable();

  currentloggedinUser?: NOTES | null;

  apiURL = 'http://localhost:8080/inboxurl/notes/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createNotes(note: NOTES): Observable<NOTES> {
    console.log('save booking');
    console.log(note);
    return this.http.post<NOTES>(this.apiURL+'save',
      JSON.stringify(note),
      this.httpOptions
    );
  }
  getNotesById(id: number): Observable<NOTES> {
    return this.http
      .get<NOTES>(this.apiURL + id)
      .pipe(retry(1), catchError(this.handleError));
  }
    getNotesBySender(id:any):Observable<NOTES>{
      return this.http.get<NOTES>(this.apiURL+'sender/'+id);
    }
    getNotesByReceiver(id:any):Observable<NOTES>{
      return this.http.get<NOTES>(this.apiURL+'receiver/'+id);
    }
  replyNote(id: any, note: NOTES): Observable<NOTES> {
    console.log('update service');
    console.log(note);
    return this.http
      .patch<NOTES>(this.apiURL+'update/' + id, JSON.stringify(note), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllNotes(): Observable<NOTES> {
    return this.http.get<NOTES>(this.apiURL + 'all');
  }
  deleteById(id: number) {
    return this.http
      .delete<NOTES>(this.apiURL + id, this.httpOptions)
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
