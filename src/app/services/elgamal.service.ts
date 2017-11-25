import { Injectable } from '@angular/core';
import {ElgamalPubKey} from '../models/ElgamalPubKey';
import {EncryptedString} from '../models/EncryptedString';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http} from '@angular/http';

declare var ElGamal: any;

@Injectable()
export class ElgamalService {

  constructor(private http: Http) { }

  public async encryptString(pubKey: ElgamalPubKey, string: string): Promise<EncryptedString> {
    let elGamal = new ElGamal(pubKey.p, pubKey.g, pubKey.y);
    let encrypted = await elGamal.encryptAsync(string);
    return new EncryptedString(encrypted.a.toString(), encrypted.b.toString());
  }

  public getMixNetKey(): Observable<any> {
    return this.http.get('http://localhost:50233/api/spg/get-elgamal-pub-key/')
      .map(
        function (response) {
          let res = response.json();
          return  new ElgamalPubKey(res.p, res.g, res.y)
        }
      );
  }
}

