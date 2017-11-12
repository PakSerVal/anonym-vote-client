import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Election} from '../../../models/Election';
import {Candidate} from '../../../models/Candidate';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {

  @Input() election: Election;
  @Output() setCandidate = new EventEmitter();

  selectedCandidate: Candidate;

  constructor() { }

  ngOnInit() {}

  selectCandidate(candidate: Candidate) {
    this.selectedCandidate = candidate;
  }

  saveCandidate() {
    this.setCandidate.emit({election: this.election, candidate: this.selectedCandidate});
  }
}
