import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Election } from '../../models/Election';
import {ElectionService} from '../../services/election.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {ElectionComponent} from './election/election.component';
import {Candidate} from '../../models/Candidate';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {

  @Input() user: User;
  @ViewChild(ElectionComponent) electionComponent;

  electionList: Election[];
  selectedElection: Election;
  bulletin = [];
  castingDone = false;
  bulletinCanBeSend = false;

  constructor(private electionService: ElectionService, private router: Router) { }

  ngOnInit() {
    this.electionService.getElectionsByUserId(this.user.id).subscribe(
      elections => this.electionList = elections
    );
    this.castingDone = this.user.isCastingDone;
  }

  setElection(election: Election) {
    this.electionComponent.selectedCandidate = null;
    this.selectedElection = election;
  }

  onSetCandidate(candidateData: {election: Election, candidate: Candidate}) {
    let elIdToUpdate;
    for (let i = 0; i < this.bulletin.length; i++) {
      let elId = this.bulletin[i].election.id;
      if (elId == candidateData.election.id) {
        elIdToUpdate = i;
      }
    }
    if (elIdToUpdate != null) {
      this.bulletin[elIdToUpdate] = candidateData;
    } else {
      this.bulletin.push(candidateData);
    }
    if (this.bulletin.length == this.electionList.length) {
      this.bulletinCanBeSend = true;
    }
  }

  onCastVote() {
    this.castingDone = true;
  }
}
