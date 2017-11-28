import {Component, Input, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {User} from '../../models/User';
import {Candidate} from '../../models/Candidate';
import {ElectionService} from '../../services/election.service';
import {UserService} from '../../services/user.service';
import {CandidateService} from '../../services/candidate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() user: User;

  elections: Election[];
  users: User[];

  selectedPage = "elections";

  constructor(private electionService: ElectionService, private userService: UserService, private candidateService: CandidateService, private router: Router) { }

  ngOnInit() {
    this.electionService.getAllElections(this.user).subscribe(
      elections => this.elections = elections
    );
    this.userService.getAllUsers(this.user).subscribe(
      users => this.users = users
    );
  }

  getElectionsString(elections: Election[]): string {
    let stringArr = [];
    for (let i = 0; i < elections.length; i++) {
      stringArr.push(elections[i].name);
    }
    return stringArr.join();
  }

  deleteElection(electionId: number) {
    this.electionService.deleteElection(this.user, electionId).subscribe(
      response => {
        if (response.status == 200) {
          alert("Election has been deleted!");
          window.location.reload();
        }
      }
    )
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(this.user, userId).subscribe(
      response => {
        if (response.status == 200) {
          alert("Election has been deleted!");
          window.location.reload();
        }
      }
    )
  }
}
