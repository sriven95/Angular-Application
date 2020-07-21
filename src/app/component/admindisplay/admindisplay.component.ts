import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User, Bookings } from 'src/app/data.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admindisplay',
  templateUrl: './admindisplay.component.html',
  styleUrls: ['./admindisplay.component.scss']
})
export class AdmindisplayComponent implements OnInit {

  details : any = [];
  dataSource : any;
  myForm = [];
  myFormEle : FormGroup;
  colValue : any = ['_id','email', 'tripType', 'fromPlace', 'toPlace', 'count','fromDate', 'toDate','luggage' ,'car_name', 'timing', 'status'];
  @ViewChild('MatPaginator', {static: true}) MatPaginator: MatPaginator;
  @ViewChild( 'MatSort' , {static: true}) sort: MatSort;

  constructor(private _fb : FormBuilder,private userService : UserServiceService, private authService : AuthenticationService) { }

  ngOnInit() {


    this.userService.getAdminBookingDetails(this.authService.currentUserValue[0].email).subscribe(data=>{//admin
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
