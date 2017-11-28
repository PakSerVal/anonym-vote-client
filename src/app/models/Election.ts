import {Candidate} from './Candidate';

export class Election {
  public id: number;
  public name: string;
  public candidates: Candidate[];

  constructor(name: string) {
    this.name = name;
  }
}
