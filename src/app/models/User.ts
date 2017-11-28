import {Election} from './Election';

export class User {
  public id: number;
  public username: string;
  public password: string;
  public LIK: string;
  public role: string;
  public isCastingDone: boolean;
  public isRegistred: boolean;
  public elections: Election[];

  constructor(LIK: string, role: string) {
    this.LIK = LIK;
    this.role = role;
  }
}
