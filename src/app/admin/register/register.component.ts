import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerform = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(8), Validators.maxLength(14)])],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required]
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private reguser: AuthService
  ) { }


  register(registerform: any) {
      this.reguser.register(registerform);
    }
  

}