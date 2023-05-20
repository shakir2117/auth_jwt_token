import { HttpClient } from '@angular/common/http';
import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { interval, Subscription } from 'rxjs';

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
  timerSubscription!: Subscription;
  timerText!: string;


  ngOnInit() {
    this.loading=true;
    this.user.getAll().subscribe(users => {
      this.loading = false;
      this.users = users;
  });
  this.timerSubscription = interval(60000).subscribe(() => {
      this.timerText = 'Users are Displayed and one minute has been passed!!';
      setTimeout(() => {
        this.timerText = '';
      }, 60000);
    });
    
  }

  constructor (private router: Router, private http: HttpClient,private auth:AuthService,private user:UserService) { }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  logout(){
  this.auth.logout();
  this.router.navigate(['/login']);
  }
}
