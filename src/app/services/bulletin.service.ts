import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Router} from '@angular/router';

@Injectable()
export  class BulletinService {

  constructor(private  http: Http, private router: Router){ }

  public sendBulletin(data: string, signature: string): Observable<Response> {
    let userId = JSON.parse(localStorage.getItem("currentUser")).id;
    let bulletinDetails = { "userId": userId, "data": data, "signature": signature};
    let body = JSON.stringify(bulletinDetails);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/send-bulletin/', body, { headers: headers })
      .map(
        function (response: Response) {
          return response;
        }
      );
  }

}
