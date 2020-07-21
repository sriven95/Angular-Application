import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject,Observable } from 'rxjs';
import { map } from 'rxjs/operators';;
import { User} from '../data.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  apiUrl = 'http://localhost:3000/api'
    constructor(private http: HttpClient,private router: Router) {

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUserSubject.asObservable();
        console.log(this.currentUserSubject);
        console.log(localStorage.getItem('currentUser'));
        //console.log(this.currentUser);
    }

    public get currentUserValue(): User {
      
        return this.currentUserSubject.value;
    }

    signIn(data:any){
      const body = data;
      console.log(body);
      return this.http.post<any>(`${this.apiUrl}/getUser`, body)
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(localStorage);
          this.currentUserSubject.next(user);
          return user;
      }));
    }
    login(data : any) {
      var body;
    if(data.email=="srivenbommakanti@gmail.com"){
      body = {
        uName : data.uName,
        pwd : data.pwd,
        email : data.email,
        update_dt : new Date(),
        isAdmin:true,
        isDp:false
      }
  
    }
    else{
      body = {
        uName : data.uName,
        pwd : data.pwd,
        email : data.email,
        update_dt : new Date(),
        isDp:false
      }
    }
      return this.http.post<any>(`${this.apiUrl}/postNewUser`, body)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log(localStorage);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/homepage']);
    }
}
