export class User {
  public id: number;
  public username: string;
  public LIK: string;
  public role: string;
  public isCastingDone: boolean

  constructor(id: number, username: string, LIK: string, role: string, isCastingDone = false) {
    this.id = id;
    this.username = username;
    this.LIK = LIK;
    this.role = role;
    this.isCastingDone = isCastingDone;
  }
}
