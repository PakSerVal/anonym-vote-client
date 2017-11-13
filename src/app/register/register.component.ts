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
  signaturePubExponent: string;
  signaturePrvExponent: string;
  noticeMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  register() {
    if(this.username && this.password && this.LIK) {
      let rsakeypair = KEYUTIL.generateKeypair("RSA", 1024);
      this.signaturePrvExponent = rsakeypair.prvKeyObj.d.toString();
      this.signaturePubExponent = rsakeypair.pubKeyObj.e.toString();
      this.signatureModulus = rsakeypair.pubKeyObj.n.toString();
      this.userService.createUser(this.username, this.password, this.LIK, rsakeypair.pubKeyObj.n.toString(16), rsakeypair.pubKeyObj.e.toString(16)).subscribe(
        response => {
          if (response.status == 200) {
            localStorage.setItem("signatureModulus", this.signatureModulus);
            localStorage.setItem("signaturePrvExponent", this.signaturePrvExponent);
            this.isRegistred = true;
          } else  {
            this.noticeMessage = "Registration failed! Invalid LIK or you already registred";
          }
        }
      )
    }
  }

}
