import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormControl,FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ResourceLoader } from '@angular/compiler';
import { map, window } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(8), Validators.maxLength(14)])
    ],
    });


  constructor(private http: HttpClient, private router: Router,
    private fb: FormBuilder,private user:AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      console.log('Already Logged In')
      this.router.navigate(['/home'])
    } 
  }

  login(loginform: any) {
    if (this.loginform.value) {
      console.log(this.loginform.value)
      this.http.post('http://localhost:5000/users/authenticate',loginform).subscribe((user:any)=>{
      localStorage.setItem('user',JSON.stringify(user));
      this.router.navigate(['/home'])
      return user;
      });
    }
    else{
      console.log(this.loginform.value) 
      console.log('Invalid Form')
    }
  }
}