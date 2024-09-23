import { Crochet } from '../../domain/crochet';
import { CrochetRepository } from '../repositories/crochet-repository';

export class UpdateCrochetUseCase {
  constructor(private crochetRepository: CrochetRepository) {}

  execute(id: string, updatedData: Partial<Crochet>) {
    const crochets = this.crochetRepository.findAll();
    const crochetIndex = crochets.findIndex(crochet => crochet.id === id);

    if (crochetIndex === -1) {
      throw new Error('Crochet not found');
    }

    // Atualiza o crochê com os novos dados fornecidos
    const updatedCrochet = { ...crochets[crochetIndex], ...updatedData };
    crochets[crochetIndex] = updatedCrochet;

    return updatedCrochet;
  }
}
