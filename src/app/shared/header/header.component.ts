import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthServiceService,
    public router: Router) { }

  ngOnInit(): void {
  }

  logout(){
  
    this.authService.logout();
    this.router.navigate(['/']);
  }

 

}
