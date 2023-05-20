import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first} from 'rxjs';


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
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private user: AuthService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      console.log('Already Logged In')
      this.router.navigate(['/home'])
    }
  }

  login(loginform: any) {
      this.user.login(this.loginform.value).subscribe({
        next: () => {
          this.router.navigate(['/home'])
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}