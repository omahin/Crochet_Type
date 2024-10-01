import { CrochetRepository } from '../repositories/crochet-repository';

export class DeleteCrochetUseCase {
  constructor(
  private crochetRepository: CrochetRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.crochetRepository.delete(id);
  }
}