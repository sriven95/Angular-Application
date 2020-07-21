import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User, Bookings } from 'src/app/data.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  details : any = [];
  dataSource : any;
  myForm = [];
  myFormEle : FormGroup;
  colValue : any = ['_id', 'tripType', 'fromPlace', 'toPlace', 'fromDate','toDate', 'luggage','count', 'car_name', 'timing', 'status'];
  @ViewChild('MatPaginator', {static: true}) MatPaginator: MatPaginator;
  @ViewChild( 'MatSort' , {static: true}) sort: MatSort;
  regimes = ['12','13','14'];
  pcount = false;
  fCity = '';
  minDate = new Date();
  toMinDate : any;
  tCity : any;
  fromPlaces = ['Hyderabad', 'Delhi', 'Bangalore', 'Mumbai', 'Goa', 'Chennai', 'Vijayawada', 'Vizag'];
  toPlaces = ['Hyderabad', 'Delhi', 'Bangalore', 'Mumbai', 'Goa', 'Chennai', 'Vijayawada', 'Vizag'];
  flightNames = ['Indigo', 'GoAir', 'Jet Airways', 'Air Asia', 'Spicejet', 'Vistara'];
  timings = ['6:00 AM', '7:00 AM', '8:00AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'
  ,'03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
  radiobtns = ['Yes', 'No'];
  radiobtns2 = ['Round Trip', 'One Way'];
  hideTo = false;
  constructor(private _fb : FormBuilder,private userService : UserServiceService, private authService : AuthenticationService) { }

  ngOnInit() {
    this.userService.getBookingDetails(this.authService.currentUserValue[0].email).subscribe(data=>{//admin
      console.log(data);
      this.details = data;
      this.dataSource = new MatTableDataSource(data);
     this.dataSource.paginator = this.MatPaginator;
      this.dataSource.sort = this.sort;
      for(var i = 0 ; i < 3; i++){
        console.log('123');
      }
      var index = 0;
    });
    console.log(this.myForm)
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
