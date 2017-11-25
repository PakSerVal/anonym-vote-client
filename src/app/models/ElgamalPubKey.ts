export class ElgamalPubKey {
  public p: string;
  public g: string;
  public y: string;

  constructor(p: string, g: string, y: string) {
    this.p = p;
    this.g = g;
    this.y = y;
  }
}
