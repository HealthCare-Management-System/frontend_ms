import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthServiceService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.auth.isLoggedIn() != null && this.auth.isLoggedIn() != undefined && this.auth.isLoggedIn()?.email != null) {
        console.log("****************************");
        console.log(this.auth.isLoggedIn());
        return true;
      }
      window.alert('You don\'t have permission to view this page');
      return false;

  }
  
}
