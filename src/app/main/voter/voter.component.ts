import {Component, Input, OnInit} from '@angular/core';
import { Election } from '../../models/Election';
import {ElectionService} from '../../services/election.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {

  @Input() user: User;

  electionList: Election[];

  constructor(private electionService: ElectionService) { }

  ngOnInit() {
    this.electionService.getElectionsByUserId(this.user.id).subscribe(
      elections => this.electionList = elections
    )
  }

}
