import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

declare var KEYUTIL : any;
declare  var KJUR: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  hsigVal: any;

  ngOnInit() {
    this.createSignature();
  }

  createSignature() {
    let rsakeypair = KEYUTIL.generateKeypair("RSA", 1024);
    let sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
    sig.init(rsakeypair.prvKeyObj);
    sig.updateString('aaa');
    let hSigVal = sig.sign();
    this.hsigVal = hSigVal;
  }
}
