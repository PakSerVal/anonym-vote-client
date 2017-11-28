export class Candidate {
  public id: number;
  public electionId: number;
  public fio: string;

  constructor(fio: string) {
    this.fio = fio;
  }
}
