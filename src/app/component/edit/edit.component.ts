import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators } from  '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  images;
  images1;
  days=false;
  stime:any;
  etime:any;
  myForm : FormGroup;
  regimes = ['12','13','14'];
  pcount = false;
  fCity = '';
  minDate = new Date();
  toMinDate : any;
  tCity : any;
  fromPlaces = ['Hyderabad', 'Delhi', 'Bangalore', 'Mumbai', 'Goa', 'Chennai', 'Vijayawada', 'Vizag'];
  toPlaces = ['Hyderabad', 'Delhi', 'Bangalore', 'Mumbai', 'Goa', 'Chennai', 'Vijayawada', 'Vizag'];
  carNames = ['Maruti Swift','Maruti Baleno','Hyundai i20','Tata Tiago','Mahindra Xuv 500','Hyundai Verna','Ford Ecosport','Hyundai Creta','Volkswagen Polo','Maruti Brezza','Ford Figo'];
  timings = ['6:00 AM', '7:00 AM', '8:00AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'
  ,'03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
  radiobtns = ['Yes', 'No'];
  radiobtns2 = ['Round Trip', 'One Way'];
  hideTo = false;
  uname;
  isAdmin;
  _id : any
  constructor(private _fb : FormBuilder,private authService : AuthenticationService,private _snackBar: MatSnackBar, private userService : UserServiceService, private router : Router,private activateRoute : ActivatedRoute) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      tripType : ['', Validators.required],
      fromPlace : ['', Validators.required],
      toPlace : ['', Validators.required],
      fromDate :['', Validators.required] ,
      toDate : '',
      count: ['', Validators.required],
      car_name : ['', Validators.required],
      timing : ['', Validators.required],
      luggage : ['', Validators.required],
    });
    const currentUser = this.authService.currentUserValue;
    if(currentUser){
      this.uname = this.authService.currentUserValue[0].uName;
      this.isAdmin=this.authService.currentUserValue[0].isAdmin;
    }

    this._id = this.activateRoute.snapshot.paramMap.get('email');
    console.log(this.activateRoute.snapshot.paramMap);
    console.log(this._id);
    this.userService.getBookingDetailsById(this._id).subscribe(data => {
      console.log(data);
      if(data[0].tripType === 'One Way'){
        this.hideTo = true;
      }
      this.myForm.setValue({
        tripType : data[0].tripType,
      fromPlace : data[0].fromPlace,
      toPlace : data[0].toPlace,
      fromDate : data[0].fromDate ,
      toDate : data[0].toDate,
      count: data[0].count,
      car_name : data[0].car_name,
      timing : data[0].timing,
      luggage : data[0].luggage,
      });
    })
  }

  submit(){
    console.log(this.myForm.value);
    if(this.myForm.value.tripType === 'One Way'){
      this.myForm.value.toDate = '';
    }
    this.userService.updateBookingDetails(this.myForm.value, this._id).subscribe(data => {
      this._snackBar.open('Success','Ok',{
        duration:2000,
      })
      this.router.navigate(['/details']);

    })
  }
  delete(){
    this.userService.deleteBookingDetails(this._id).subscribe(data=>{
      this._snackBar.open('Booking cancelled','Ok',{
        duration:2000,
      })
      this.router.navigate(['/home']);
    })
  }
  approve(){
    console.log(this.myForm.value);
    if(this.myForm.value.tripType === 'One Way'){
      this.myForm.value.toDate = '';
    }
    this.userService.approveBookingDetails(this.myForm.value, this._id).subscribe(data => {
      this._snackBar.open('Success','Ok',{
        duration:2000,
      })
      this.router.navigate(['/userdetails']);

    })
    
  }
    tripType(event){
    console.log(event.value);
    if(event.value=== 'One Way'){
      this.hideTo = true;
      this.myForm.get('toDate').clearValidators();
      this.myForm.get('toDate').updateValueAndValidity();
    }
    else{
      this.hideTo = false;
      this.myForm.get('toDate').setValidators([Validators.required]);
    }
  }
}
