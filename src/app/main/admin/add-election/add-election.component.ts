import { Component, OnInit } from '@angular/core';
import {Candidate} from '../../../models/Candidate';
import {User} from '../../../models/User';
import {CandidateService} from '../../../services/candidate.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.css']
})
export class AddElectionComponent implements OnInit {

  user: User;
  candidates = [];
  selectedCandidates: Candidate[];
  electionName: string;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.setUser();
    this.candidateService.getAllCandidates(this.user).subscribe(
      candidates => {
        for (let i = 0; i <= candidates.length; i++) {
          this.candidates.push({label: candidates[i].fio, value: candidates[i]})
        }
      }
    );
  }

  setUser() {
    if (localStorage.getItem("currentUser") != null) {
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.user = new User(user.id, user.username, user.LIK, user.role, user.isCastingDone);
    }
  }

  saveElection() {

  }
}
