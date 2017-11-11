import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: User;


  constructor() { }

  ngOnInit() {
    this.setUser();
  }

  setUser() {
    if (localStorage.getItem("currentUser") != null) {
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.user = new User(user.id, user.username, user.LIK, user.role);
    }
  }
}
