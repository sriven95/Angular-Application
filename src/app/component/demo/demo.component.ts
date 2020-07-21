import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  filename:any;
  myForm : FormGroup;
  userDetails : any;
  uname;
  isAdmin;
  url;
  constructor(private _fb : FormBuilder,private authService : AuthenticationService,private userService : UserServiceService) { }
  
  ngOnInit() {
    
    this.userDetails =  this.authService.currentUserValue[0];
    
    this.myForm = this._fb.group({
      uName : '',
      email : '',
      update_dt : ''
    })
  
    const currentUser = this.authService.currentUserValue;
    if(currentUser){
      this.uname = this.authService.currentUserValue[0].uName;
      this.isAdmin=this.authService.currentUserValue[0].isAdmin;
    }

    this.myForm.setValue({
      uName : this.userDetails.uName,
      email : this.userDetails.email,
      update_dt : new Date(this.userDetails.update_dt)
    })
  }
 
}
