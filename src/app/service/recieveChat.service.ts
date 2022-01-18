import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, retry } from "rxjs";
import { NOTES } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class RecieveNotesService {
  private userSubject: BehaviorSubject<NOTES | null> = new BehaviorSubject<any>(
    null
  );
  public loggedinUser: Observable<NOTES | null> =
    this.userSubject.asObservable();

  currentloggedinUser?: NOTES | null;

  apiURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<NOTES> {
    return this.http.get<NOTES>(this.apiURL + '/appointment');
  }
  getNotes():Observable<NOTES>{
    return this.http.get<NOTES>(this.apiURL)
    .pipe(
    map((note:NOTES)=>{
      return note as NOTES;
    }))
  }

}
