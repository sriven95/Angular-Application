import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  uname = '';
  val : any;
  isAdmin;
  currentUser:any;
  constructor(private userService: UserServiceService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    
     this.currentUser= this.authenticationService.currentUserValue;
    console.log(this.currentUser);
    if(!isUndefined(this.currentUser)){
      if(this.currentUser){
        this.uname = this.authenticationService.currentUserValue[0].uName;
        this.isAdmin=this.authenticationService.currentUserValue[0].isAdmin;
      }
      
    }
  }

  logOut(){
    this.authenticationService.logout();
  }
  

}
