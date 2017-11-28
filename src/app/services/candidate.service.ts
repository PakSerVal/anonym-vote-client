import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Candidate} from '../models/Candidate';
import {User} from '../models/User';

@Injectable()
export class CandidateService {

  constructor(private http: Http) { }

  public getAllCandidates(user: User): Observable<Candidate[]> {
    user.password = localStorage.getItem("userPassword");
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://localhost:50233/api/spg/get-all-candidates/', body, { headers: headers })
      .map(this.extractCandidates);
  }

  private extractCandidates(response: Response) {
    let res = response.json();
    let candidates: Candidate[] = [];
    for (let i = 0; i < res.length; i++) {
      let candidate = new Candidate(res[i].fio);
      candidate.id = res[i].id;
      candidate.electionId = res[i].electionId;
      candidates.push(candidate);
    }
    return candidates;
  }
}
