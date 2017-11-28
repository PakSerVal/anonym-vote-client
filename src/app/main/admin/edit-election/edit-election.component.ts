import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {Election} from '../../../models/Election';
import {ElectionService} from '../../../services/election.service';
import {Candidate} from '../../../models/Candidate';

@Component({
  selector: 'app-edit-election',
  templateUrl: './edit-election.component.html',
  styleUrls: ['./edit-election.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditElectionComponent implements OnInit {

  user: User;
  election: Election;
  editableCandidate: Candidate;
  editCandidateFlag = false;
  addCandidateFio: string;

  constructor(private electionService: ElectionService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.setUser();
    this.activatedRoute.params.forEach((params: Params) => {
      let electionId = +params["id"];
      this.electionService.getElectionById(this.user, electionId).subscribe(
        election => {
          this.election = election;
        }
      );
    });
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

  editCandidate(candidate: Candidate) {
    this.editableCandidate = new Candidate(candidate.fio);
    this.editableCandidate.id = candidate.id;
    this.editableCandidate.electionId = candidate.electionId;
    this.editCandidateFlag = true;
  }

  saveCandidate() {
    for (let i = 0; this.election.candidates.length; i++) {
      if (this.election.candidates[i].id == this.editableCandidate.id) {
        this.election.candidates[i] = this.editableCandidate;
        break;
      }
    }
    this.editableCandidate = null;
    this.editCandidateFlag = false;
  }

  addCandidate() {
    if (this.addCandidateFio != "") {
      let candidate = new Candidate(this.addCandidateFio);
      this.election.candidates.push(candidate);
      this.addCandidateFio = "";
    }
  }

  deleteCandidate(candidateIndex: number) {
    this.election.candidates.splice(candidateIndex, 1);
  }

  saveElection() {
    this.electionService.updateElection(this.user, this.election).subscribe(
      response => {
        if (response.status == 200) {
          alert("Election save!");
          this.router.navigate(["/main"])
        }
      }
    );
  }
}
