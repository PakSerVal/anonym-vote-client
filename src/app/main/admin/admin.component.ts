import {Component, Input, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {User} from '../../models/User';
import {Candidate} from '../../models/Candidate';
import {ElectionService} from '../../services/election.service';
import {UserService} from '../../services/user.service';
import {CandidateService} from '../../services/candidate.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() user: User;

  elections: Election[];
  users: User[];
  candidates: Candidate[];

  selectedPage = "elections";

  constructor(private electionService: ElectionService, private userService: UserService, private candidateService: CandidateService) { }

  ngOnInit() {
    this.electionService.getAllElections(this.user).subscribe(
      elections => this.elections = elections
    );
    this.candidateService.getAllCandidates(this.user).subscribe(
      candidates => this.candidates = candidates
    );
    this.userService.getAllUsers(this.user).subscribe(
      users => this.users = users
    );
  }

}
