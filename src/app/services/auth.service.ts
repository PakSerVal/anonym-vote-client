import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable()
export  class AuthService {
  constructor(private  http: Http, private userService: UserService, private router: Router){ }

  logIn(username: string, password: string) {
    this.userService.loginUser(username, password).subscribe(
      user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userPassword', password);
        this.router.navigate(['/main']);
      }
    )
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
