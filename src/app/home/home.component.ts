import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';

export class User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users?: User[];
  loading = false;


  ngOnInit() {
    console.log('getting users');
    this.loading=true;
    return this.http.get<User[]>('http://localhost:5000/').subscribe(users=>{
      this.loading=false;
      this.users=users;
    });
  }

  constructor (private router: Router, private http: HttpClient) { }


  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
