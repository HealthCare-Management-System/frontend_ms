import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginModel } from '../models/login.model';
import { LoginResponseModel } from '../models/loginResponse.model';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';
import jwt_decode from 'jwt-decode';
import { lastValueFrom } from 'rxjs';
import { Medication } from '../models/Medication.model';
import { Diagnosis } from '../models/Diagnosis.model';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<any>(
    null
  );
  public loggedinUser: Observable<User | null> =
    this.userSubject.asObservable();

  currentloggedinUser?: User | null;

  apiURL = 'http://localhost:8080';



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  isLoggedIn(): User | null {
    let user = this.tokenStorage.getUser();

    if (user) return user;

    return null;
  }

  secondloggin() {
    let token = this.tokenStorage.getToken();

    if (!token) {
      return false;
    }
    return true;
  }

  getUsers(): Observable<User> {
    return this.http
      .get<User>(this.apiURL + '/users')
      .pipe(retry(1), catchError(this.handleError));
  }

  getUsersBasedOnRoleAndStatus(role: string, status: string): Observable<User> {
    return this.http
      .get<User>(this.apiURL + '/users/' + role + '/' + status)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(this.apiURL + '/persons/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  getPhysicianList(physicianName: any): Observable<string[]> {
    return this.http.get<string[]>(this.apiURL + '/role/' + physicianName);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get<User>(this.apiURL + '/users/' + email)
      .pipe(retry(1), catchError(this.handleError));
  }

  createUser(user: User): Observable<User> {
    return this.http
      .post<User>(
        this.apiURL + '/auth/signup',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  addMedication(ob: Medication): Observable<Medication> {
    return this.http
      .post<Medication>(
        this.apiURL + '',
        JSON.stringify(Medication),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  addDiagnosis(ob: Diagnosis): Observable<Diagnosis> {
    return this.http
      .post<Diagnosis>(
        this.apiURL + '',
        JSON.stringify(Diagnosis),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http
      .put<User>(
        this.apiURL + '/persons/' + id,
        JSON.stringify(user),
        this.httpOptions
      )

      .pipe(retry(1), catchError(this.handleError));
  }

  updateUserStatus(id: number, status: String): Observable<User> {
    return this.http
      .patch<User>(
        this.apiURL + '/employees/' + id + '/' + status,
        JSON.stringify(status),
        this.httpOptions
      )

      .pipe(retry(1), catchError(this.handleError));
  }

  getCorporateActiveUsers(status: string) {
    return this.http
      .get<User>(this.apiURL + '/users/corporate-user-list/' + status)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteUser(id: number) {
    return this.http
      .delete<User>(this.apiURL + '/users/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  authLogin(obj: LoginModel): Observable<LoginResponseModel> {
    return this.http
      .post<LoginResponseModel>(
        this.apiURL + '/auth/login',
        JSON.stringify(obj),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  async getToken(name: string, pass: string) {
    let obj = new LoginModel();
    obj.username = name;
    obj.password = pass;

    let apiCall = await lastValueFrom(this.authLogin(obj));

    this.tokenStorage.saveToken(apiCall.token);
    this.setLoggedInUser();
  }

  // apiCall.subscribe((data: LoginResponseModel | any) => {
  //  console.log(data.token);
  //   this.tokenStorage.saveToken(data.token);
  //    this.setLoggedInUser();
  //  });

  // Error handling
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

  setLoggedInUser() {
    let token: any = this.tokenStorage.getToken();
    if (token != null) {
      let tokenInfo = this.getDecodedAccessToken(token); // decode token
      console.log(tokenInfo);

      this.getUserByEmail(tokenInfo.sub).subscribe((data) => {
        this.userSubject.next(data);
        this.currentloggedinUser = data;
        this.tokenStorage.saveUser(data);
        window.location.reload();
      });
    }
  }

  login(name: string, pass: string) {
    this.getToken(name, pass);
  }

  logout() {
    this.userSubject.next(null);
    this.tokenStorage.signOut();
    this.currentloggedinUser = null;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


}
