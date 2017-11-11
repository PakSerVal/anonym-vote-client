export class User {
  public id: number;
  public username: string;
  public LIK: string;
  public role: string;

  constructor(id: number, username: string, LIK: string, role: string) {
    this.id = id;
    this.username = username;
    this.LIK = LIK;
    this.role = role;
  }
}
