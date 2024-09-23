import { CrochetRepository } from '../../application/repositories/crochet-repository';
import { Crochet } from '../../domain/crochet';

export class Repository implements CrochetRepository {
  private crochets: Crochet[] = [];

  save(crochet: Crochet): void {
    this.crochets.push(crochet);
  }

  findAll(): Crochet[] {
    return this.crochets;
  }
}
