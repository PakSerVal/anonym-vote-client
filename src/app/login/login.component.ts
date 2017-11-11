import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logOut();
  }

  login() {
    if (this.username && this.password) {
      this.authService.logIn(this.username, this.password);
      this.username = null;
      this.password = null;
    }
  }
}
