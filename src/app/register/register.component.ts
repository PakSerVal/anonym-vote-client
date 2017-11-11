import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from '../services/user.service';
declare var KEYUTIL : any;
declare  var KJUR: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  isRegistred = false;
  username: string;
  password: string;
  LIK: string;
  signatureModulus: string;
  signauturePubExponent: string;
  signaturePrvKey: any;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  register() {
    if(this.username && this.password && this.LIK) {
      let rsakeypair = KEYUTIL.generateKeypair("RSA", 1024);
      this.signaturePrvKey = rsakeypair.prvKeyObj;
      this.signauturePubExponent = rsakeypair.pubKeyObj.e.toString();
      this.signatureModulus = rsakeypair.pubKeyObj.n.toString();
      this.userService.createUser(this.username, this.password, this.LIK, rsakeypair.pubKeyObj.n.toString(16), rsakeypair.pubKeyObj.e.toString(16)).subscribe(
        response => {
          if (response.status == 200)
          this.isRegistred = true;
        }
      )
    }
  }

}
