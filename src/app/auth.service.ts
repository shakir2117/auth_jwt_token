import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router:Router) { }

  login(loginform:any){
    this.http.post('http://localhost:3000/api/login',loginform).subscribe((result:any)=>{
    localStorage.setItem('token',result.token)   
    this.router.navigate(['/'])
  })
  }
}
