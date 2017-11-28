import { Component, OnInit } from '@angular/core';
import {Candidate} from '../../../models/Candidate';
import {User} from '../../../models/User';
import {CandidateService} from '../../../services/candidate.service';
import {forEach} from '@angular/router/src/utils/collection';
import {ElectionService} from '../../../services/election.service';
import {Election} from '../../../models/Election';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.css']
})
export class AddElectionComponent implements OnInit {

  user: User;
  candidates = [];
  electionName: string;
  candidateFio: string;

  constructor(private candidateService: CandidateService, private electionService: ElectionService, private router: Router) { }

  ngOnInit() {
    this.setUser();
  }

  setUser() {
    if (localStorage.getItem("currentUser") != null) {
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.user = new User(user.LIK, user.role);
      this.user.username = user.username;
      this.user.id = user.id;
      this.user.isCastingDone = user.isCastingDone;
    }
  }

  saveElection() {
    let election = new Election(this.electionName);
    election.candidates = this.candidates;
    this.electionService.addElection(this.user, election).subscribe(
      response => {
        if (response.status == 200) {
          alert("Election save!");
          this.router.navigate(["/main"])
        }
      }
    );
  }

  addCandidate() {
    if (this.candidateFio != "") {
      let candidate = new Candidate(this.candidateFio);
      this.candidates.push(candidate);
      this.candidateFio = "";
    }
  }
}
