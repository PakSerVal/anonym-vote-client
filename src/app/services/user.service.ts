import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../models/User';
import {Election} from '../models/Election';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public registerUser(username: string, password: string, LIK: string, signatureModulus: string, signauturePubExponent: string): Observable<Response> {
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
    let user = { "username": username, "password": password};
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/login-user/', body, { headers: headers })
      .map(
        function (response: Response) {
          let res = response.json();
          let user = new User(res.lik, res.role);
          user.username = res.username;
          user.id = res.id;
          user.isCastingDone = res.isCastingDone;
          return user;
        }
      )
      .catch(this.handleError);
  }

  public addUser(user: User, addUser: User, selectedElections: Election[]) {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify({user: user, elections: selectedElections, addUser: addUser});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/add-user/', body, { headers: headers })
      .map(
        function (response: Response) {
          return response;
        }
      );
  }

  public deleteUser(user: User, userId: number) {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify({user: user, userId: userId});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/delete-user/', body, { headers: headers })
      .map(
        function (response: Response) {
          return response;
        }
      );
  }

  public getAllUsers(user: User): Observable<User[]> {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/get-all-users', body, { headers: headers })
      .map(
        function (response: Response) {
          let users: User[] = [];
          let res = response.json();
          for (let i = 0; i < res.length; i++) {
            let user = new User(res[i].lik, res[i].role);
            user.id = res[i].id;
            user.username = res[i].username;
            user.isCastingDone = res[i].isCastingDone;
            user.isRegistred = res[i].isRegistred;
            let elections: Election[] = [];
            for (let e = 0; e < res[i].elections.length; e++) {
              let election = new Election(res[i].elections[e].name);
              election.id = res[i].elections[e].id;
              elections.push(election);
            }
            user.elections = elections;
            users.push(user);
          }
          return users;
        }
      );
  }

  private handleError(error: any, cought: Observable<any>): any {
    return error;
  }
}

