import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../models/User';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public createUser(username: string, password: string, LIK: string, signatureModulus: string, signauturePubExponent: string): Observable<Response> {
    let usersDetails = { "username": username, "password": password, "LIK": LIK, signatureModulus: signatureModulus, signaturePubExponent: signauturePubExponent};
    let body = JSON.stringify(usersDetails);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/register-user/', body, { headers: headers })
      .map(
        function (response: Response) {
          return response;
        }
      )
      .catch(this.handleError);
  }

  public loginUser(username: string, password: string): Observable<User> {
    const user = { "username": username, "password": password};
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/login-user/', body, { headers: headers })
      .map(
        function (response: Response) {
          let res = response.json();
          let user = new User(res.id, res.username, res.lik, res.role, res.isCastingDone);
          return user;
        }
      );
  }

  private handleError(error: any, cought: Observable<any>): any {
    let message = "";

    if (error instanceof Response) {
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else {
      message = error.message ? error.message : error.toString();
    }

    console.error(message);

    return message;
  }
}

