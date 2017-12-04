import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';

@Injectable()
export  class AuthService {
  constructor(private  http: Http, private userService: UserService, private router: Router){ }

  logIn(username: string, password: string) {
    this.userService.loginUser(username, password).subscribe(
      user => {
        if(user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('userPassword', password);
          this.router.navigate(['/main']);
        }
      }
    )
  }

  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userPassword');
    this.router.navigate(['/login']);
  }
}
