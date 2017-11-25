export class Candidate {
  public id: number;
  public electionId: number;
  public fio: string;

  constructor(id: number, electionId: number, fio: string) {
    this.id = id;
    this.electionId = electionId;
    this.fio = fio;
  }
}
