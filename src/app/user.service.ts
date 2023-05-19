import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './home/home.component';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get<User[]>('http://localhost:5000/users');
    }
} 