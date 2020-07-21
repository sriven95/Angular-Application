import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide=true;
  hide1=true;
  hide2=true;
  myForm : FormGroup;
  btnValue = true;
  btnValues = 'Sign Up';
  pwd1:any;
  pwd2:any;
  pwdMatches=false;
  constructor(private _fb : FormBuilder,private _snackBar: MatSnackBar, private userService : UserServiceService, private authenticationService: AuthenticationService
    ,private router: Router,public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
    this.btnValue = true;
    this.btnValues = 'Sign Up';
    this.myForm = this._fb.group({
      'uName' :'',
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'pwd': ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(13),Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)])],
      
    })
  }

  loggedIn(){
    this.authenticationService.signIn(this.myForm.value).subscribe(data=>{
      if(data.length>0){
        if(data[0].email === this.myForm.value.email && data[0].pwd === this.myForm.value.pwd){
          this._snackBar.open('Successfully logged in','Ok',{
            duration:2000,    
          })
          this.dialogRef.close();
          this.router.navigate(['/home']);
        }
      }    
      else{
        console.log('check');
        this._snackBar.open('Check email and password','Ok',{
          duration:2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
    
        })
      }
    });

  }


  loginOrSignup(){
    this.btnValue = !this.btnValue;
    if(this.btnValue){
      this.btnValues = 'Sign Up';
      this.myForm.controls['uName'].clearValidators();
      this.myForm.controls['uName'].updateValueAndValidity();
      this.myForm.get('email').setValue('',{emitEvent:false});
      this.myForm.get('pwd').setValue('',{emitEvent:false});

    }
    else{
      this.btnValues = 'Login';
      this.myForm.controls['uName'].setValidators([Validators.required]);
    }
  }

  SignUp(){
    this.userService.getUserDetailsByEmail(this.myForm.value.email).subscribe(data=>{
      if(Object.keys(data).length > 0){
        if(data[0].email === this.myForm.value.email){
          this._snackBar.open('Account already exists','Ok',{
            duration:2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
    

          })
        }
      }
      else{
        this.authenticationService.login(this.myForm.value).subscribe(val=>{
          this._snackBar.open('Successfully created an account','Ok',{
            duration:2000,
            verticalPosition: 'top', 
             horizontalPosition: 'center',

          })
          this.dialogRef.close();
        })
      }
    });
    this.router.navigate(['homepage']);

  }
  checkPwd(){
    if(this.pwd1 === this.pwd2){
      this.pwdMatches=true;
    }
    else{
      this.pwdMatches=false;
      this._snackBar.open('Passwords is not matched','Ok',{
        duration:2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
    

      })
    }
  }
   
  error()
  {
    
    if((this.myForm.get('pwd').hasError('minlength'))){
      this._snackBar.open('Password should be minimum of 8 characters','Ok',{
        duration:2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
    

      })
      
    }
    
    else if(this.myForm.get('pwd').hasError('maxlength')){
      this._snackBar.open('Password should be maximum of 13 characters','Ok',{
        duration:2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
    

      })
      
    }
    else if(this.myForm.get('pwd').hasError('pattern')){
      this._snackBar.open('Password should atleast contain one Uppercase Character, one Lowercase Character and one digit','Ok',{
        duration:3700,
        verticalPosition: 'top',
        horizontalPosition: 'center',
    

      })
     
    }
    
}
next()
{
  if(!(this.myForm.get('email').valid)){
    this._snackBar.open('Check the email address','Ok',{
      duration:2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    

    })    
  }
  
  
}
}
