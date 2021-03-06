import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.setUser();
  }

  setUser() {
    if (localStorage.getItem("currentUser") != null) {
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.user = new User(user.LIK, user.role);
      this.user.username = user.username;
      this.user.id = user.id;
      this.user.isCastingDone = user.isCastingDone;
    }
  }

  logout() {
    this.authService.logOut();
  }
}
