import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard canActivate called');
    if (localStorage.getItem('user')) {

      console.log('User is logged in');
      return true;
    }
  
    console.log('User is not logged in, redirecting to login page');
    return this.router.navigate(['./admin/login']);
  }
  
  

  
}
