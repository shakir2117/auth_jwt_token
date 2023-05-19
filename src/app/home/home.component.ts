import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
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
    this.loading=true;
    this.user.getAll().subscribe(users => {
      this.loading = false;
      this.users = users;
  });
  }

  constructor (private router: Router, private http: HttpClient,private auth:AuthService,private user:UserService) { }


  logout(){
  this.auth.logout();
  this.router.navigate(['/login']);
  }
}
