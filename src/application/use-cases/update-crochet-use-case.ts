import { Crochet } from '../../domain/crochet';
import { CrochetRepository } from '../repositories/crochet-repository';

export class UpdateCrochetUseCase {
  constructor(private crochetRepository: CrochetRepository) {}

  async execute(id: string, params: Partial<Crochet>): Promise<Crochet | null> {
  return await this.crochetRepository.update(id, params); 
  }
}
