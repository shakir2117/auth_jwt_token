import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from './home/home/home.component';
import { LowerCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  private user: Observable<User | null>;



  constructor(private http: HttpClient,private router:Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();

   }

   public get userValue() {
    return this.userSubject.value;
}

login(loginform: any): Observable<User> { 
  console.log(loginform);
  return this.http.post<User>('http://localhost:5000/users/authenticate',loginform)
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      this.router.navigate(['/home/home']);
      return user;
    }));
}
register(registerform: any) {
  console.log(registerform);
  this.http.post('http://localhost:3000/users/', registerform ).subscribe(data => {
    console.log('Registration successful:', data);
    this.router.navigate(['/admin/login']);  
  })
}


  logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/admin/login']);
  }
}
