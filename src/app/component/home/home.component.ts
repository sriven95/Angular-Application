import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  uname = '';
  isAdmin;
  constructor(private userService: UserServiceService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    console.log(this.userService.checkIsLogin())
    
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
      this.uname = this.authenticationService.currentUserValue[0].uName;
      this.isAdmin=this.authenticationService.currentUserValue[0].isAdmin;

    }
  }
  
  search(event: any){
    console.log(event.target.value);
  }

}
