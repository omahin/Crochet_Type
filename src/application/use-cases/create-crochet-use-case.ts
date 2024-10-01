import { Crochet } from '../../domain/crochet';
import { CrochetRepository } from '../repositories/crochet-repository';

export class CreateCrochetUseCase {
  constructor(
    private crochetRepository: CrochetRepository,
  ) {}

  execute(crochetParams: Partial<Crochet>): Crochet {
    const crochet = {
        created_at: this.getDate(),
        ...crochetParams,
    } as Crochet;

    this.crochetRepository.save(crochet);
    return crochet;
  }

  private getDate() {
    return new Date().toLocaleDateString('PT-br');
  }
}