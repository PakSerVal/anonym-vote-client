import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Election} from '../models/Election';
import {Candidate} from '../models/Candidate';
import {User} from '../models/User';

@Injectable()
export class ElectionService {

  constructor(private http: Http) { }

  public getElectionById(user: User, electionId: number): Observable<Election> {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify({user: user, electionId: electionId});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/get-election-by-id/', body, { headers: headers })
      .map(function (response: Response) {
        let res = response.json();
        let election = new Election(res.name);
        election.id = res.id;
        let candidates: Candidate[] = [];
        for (let c = 0; c < res.candidates.length; c++) {
          let candidate = new Candidate(res.candidates[c].fio);
          candidate.id = res.candidates[c].id;
          candidate.electionId = res.candidates[c].electionId;
          candidates.push(candidate);
        }
        election.candidates = candidates;
        return election;
      });
  }

  public getElectionsByUserId(userId: number): Observable<Election[]> {
    let user = { "userId": userId};
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/get-elections-by-user/', body, { headers: headers })
      .map(this.extractElections);
  }

  public getAllElections(user: User): Observable<Election[]> {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/get-all-elections/', body, { headers: headers })
      .map(this.extractElections);
  }

  public addElection(user: User, election: Election): Observable<Response> {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify({user: user, election: election});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/add-election/', body, { headers: headers })
      .map(
        function (response: Response) {
          return response;
        }
      );
  }

  public updateElection(user: User, election: Election): Observable<Response> {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify({user: user, election: election});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/update-election/', body, { headers: headers })
      .map(
        function (response: Response) {
          return response;
        }
      );
  }

  public deleteElection(user:User, electionId: number): Observable<Response> {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify({user: user, electionId: electionId});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/delete-election/', body, { headers: headers })
      .map(
        function (response: Response) {
          return response;
        }
      );
  }

  private extractElections(response: Response) {
    let res = response.json();
    let elections: Election[] = [];
    for (let i = 0; i < res.length; i++) {
      let election = new Election(res[i].name);
      election.id = res[i].id;
      let candidates: Candidate[] = [];
      for (let c = 0; c < res[i].candidates.length; c++) {
        let candidate = new Candidate(res[i].candidates[c].fio);
        candidate.id = res[i].candidates[c].id;
        candidate.electionId = res[i].candidates[c].electionId;
        candidates.push(candidate);
      }
      election.candidates = candidates;
      elections.push(election);
    }
    return elections;
  }
}
