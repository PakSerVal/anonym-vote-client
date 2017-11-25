import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BulletinService} from '../../../services/bulletin.service';
import {ElgamalPubKey} from '../../../models/ElgamalPubKey';
import {ElgamalService} from '../../../services/elgamal.service';

declare var parseBigInt : any;
declare  var RSAKey: any;
declare  var KJUR: any;

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css']
})
export class BulletinComponent implements OnInit {

  @Input() bulletin;
  @Input() bulletinCanBeSend: boolean;
  @Output() castVote = new EventEmitter();

  bulletinToSign = false;
  signaturePrvExponent: string;
  signatureModulus: string;
  mixNetPubKey: ElgamalPubKey;

  constructor(private bulletinService: BulletinService, private elgamalService: ElgamalService) { }

  ngOnInit() {
    this.elgamalService.getMixNetKey().subscribe(
      mixNetKey => {
        this.mixNetPubKey = mixNetKey;
      }
    );
  }

  sendBulletin() {
    this.setSignatureData();
    this.bulletinToSign = true;
  }

  setSignatureData() {
    this.signaturePrvExponent = localStorage.getItem("signaturePrvExponent");
    this.signatureModulus = localStorage.getItem("signatureModulus");
  }

  encryptAndSendBulletin() {
    let bulletinString = this.createBulletinString();
    this.encryptAndSendBulletinString(bulletinString);
  }

  createBulletinString(): string {
    let formattedBulletin = [];
    for (let i = 0; i < this.bulletin.length; i++) {
      let electionId = this.bulletin[i].election.id;
      let candidateId = this.bulletin[i].candidate.id;
      formattedBulletin.push({electionId: electionId, candidateId: candidateId});
    }
    return JSON.stringify(formattedBulletin);
  }

  signBulletinString(bulletinString: string): string {
    let key = new RSAKey();
    key.isPrivate = true;
    key.n = parseBigInt(this.signatureModulus);
    key.d = parseBigInt(this.signaturePrvExponent);
    let sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
    sig.init(key);
    sig.updateString(bulletinString);
    return sig.sign();
  }

  encryptAndSendBulletinString(bulletingString: string) {
    this.elgamalService.encryptString(this.mixNetPubKey, bulletingString).then(
      encrypted => { return JSON.stringify(encrypted); }
    ).then(
      encrypted => {
        let signature = this.signBulletinString(encrypted);
        this.bulletinService.sendBulletin(encrypted, signature).subscribe(
          response => {
            if (response.status == 200) {
              this.castVote.emit();
              alert("Your vote accept!");
              this.bulletinToSign = false;
            }
          }
        )
      }
    );
  }
}
