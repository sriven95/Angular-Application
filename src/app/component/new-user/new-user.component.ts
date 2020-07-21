import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators } from  '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Bookings} from 'src/app/data.model';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  images;
  images1;
  days=false;
  myForm : FormGroup;
  regimes = ['12','13','14'];
  fCity = '';
  minDate = new Date();
  toMinDate : any;
  tCity : any;
  fromPlaces = ['Hyderabad', 'Delhi', 'Bangalore', 'Mumbai', 'Goa', 'Chennai', 'Vijayawada', 'Vizag'];
  toPlaces = ['Hyderabad', 'Delhi', 'Bangalore', 'Mumbai', 'Goa', 'Chennai', 'Vijayawada', 'Vizag'];
  carNames = ['Maruti Swift','Maruti Baleno','Hyundai i20','Tata Tiago','Mahindra Xuv 500','Hyundai Verna','Ford Ecosport','Hyundai Creta','Volkswagen Polo','Maruti Brezza','Ford Figo'];
  timings = ['6:00 AM', '7:00 AM', '8:00AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'
  ,'03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
  radiobtns2 = ['Round Trip','One Way'];
  hideTo = false;
  booking : Bookings;
  hide=false;
  stime:any;
  etime:any;
  isAdmin;


  
  constructor(private _fb : FormBuilder,private _snackBar: MatSnackBar,private router : Router,private authService : AuthenticationService, private userService : UserServiceService) { }
  
  ngOnInit() {
    

    this.myForm = this._fb.group({
      tripType : ['', Validators.required],
      fromPlace : ['', Validators.required],
      toPlace : ['', Validators.required],
      fromDate :['', Validators.required] ,
      toDate : '',
      count: '',
      car_name : ['', Validators.required],
      timing : ['', Validators.required],
      luggage : ['', Validators.required],
      License1 : ['', Validators.required],
      License2 : ['', Validators.required],
      
    });

  }
  getDetails(){
    this.userService.getUserDetails().subscribe(data => {
      console.log(data);
    })
  }
  tripType(event){
    console.log(event.value);
    if(event.value=== 'One Way'){
      this.hideTo = true;
      this.myForm.get('toDate').clearValidators();
      this.myForm.get('toDate').updateValueAndValidity();
      
      this.myForm.get('License2').clearValidators();
      this.myForm.get('License2').updateValueAndValidity();
    }
    else{
      this.hideTo = false;
      this.myForm.get('toDate').setValidators([Validators.required]);
      this.myForm.get('License2').setValidators([Validators.required]);
    }
  }
  submit(){
    console.log(this.myForm.value);
    this.booking = this.myForm.value;
    this.booking.user_email = this.authService.currentUserValue[0].email;
    this.booking.status = 'PENDING';
    if(this.myForm.value.tripType === 'One Way'){
      this.myForm.value.toDate = '';
    }
    console.log(this.booking);
    this.userService.submitNewBookingDetails(this.booking).subscribe(data => {
      this._snackBar.open('Success','Ok',{
        duration:2000,
      })
      this.router.navigate(['/home']);
    })
  }
  selectImage(event){
    if(event.target.files.length>0){
      const file =event.target.files[0];
      this.images =file;
    }
  }
  selectImage1(event){
    if(event.target.files.length>0){
      const file =event.target.files[0];
      this.images1 =file;
    }
  }
  onSubmit(){
    this.userService.upload(this.images).subscribe(data => {
      this._snackBar.open('Uploaded','Ok',{
        duration:2000,
      })
    });
  }
  onSubmit1(){
    this.userService.upload1(this.images1).subscribe(data => {
      this._snackBar.open('Uploaded','Ok',{
        duration:2000,
      })
    });
  }
  
  showDate(){
    if(this.etime){
      var diff = Math.abs(this.etime.getTime()-this.stime.getTime());
      var r=Math.ceil(diff/(1000*3600*24));
      console.log(r);
      if(r>3){
        this.days=true;
        this.myForm.get('License2').setValidators([Validators.required]);
      
      } 
      else{
        this.days=false;
        this.myForm.get('License2').clearValidators();
        this.myForm.get('License2').updateValueAndValidity();  
      }
    }
    
  }
  


}
