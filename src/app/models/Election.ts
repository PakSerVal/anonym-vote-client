import {Candidate} from './Candidate';

export class Election {
  public id: number;
  public name: string;
  public candidates: Candidate[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
