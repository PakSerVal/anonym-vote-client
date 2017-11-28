import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from '../../../models/User';
import {CandidateService} from '../../../services/candidate.service';
import {ElectionService} from '../../../services/election.service';
import {Router} from '@angular/router';
import {Election} from '../../../models/Election';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserComponent implements OnInit {

  user: User;
  elections = [];
  userLIK: string;
  userRole = "voter";
  selectedElections: Election[] = [];
  constructor(private userService: UserService, private electionService: ElectionService, private router: Router) { }

  ngOnInit() {
    this.setUser();
    this.electionService.getAllElections(this.user).subscribe(
      elections => {
        for (let i = 0; i < elections.length; i++) {
          this.elections.push({label: elections[i].name, value: elections[i]});
        }
      }
    );
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

  saveUser() {
    let addUser = new User(this.userLIK, this.userRole);
    this.userService.addUser(this.user, addUser, this.selectedElections).subscribe(
      response => {
        if (response.status == 200) {
          alert("User has been added!");
          this.router.navigate(["/main"])
        }
      }
    )
  }

  //
  // saveElection() {
  //   let election = new Election(this.electionName);
  //   election.candidates = this.candidates;
  //   this.electionService.addElection(this.user, election).subscribe(
  //     response => {
  //       if (response.status == 200) {
  //         alert("Election save!");
  //         this.router.navigate(["/main"])
  //       }
  //     }
  //   );
  // }

  // addCandidate() {
  //   if (this.candidateFio != "") {
  //     let candidate = new Candidate(this.candidateFio);
  //     this.candidates.push(candidate);
  //     this.candidateFio = "";
  //   }
  // }

}
