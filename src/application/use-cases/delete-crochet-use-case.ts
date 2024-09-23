import { CrochetRepository } from '../repositories/crochet-repository';

export class DeleteCrochetUseCase {
  constructor(private crochetRepository: CrochetRepository) {}

  execute(id: string) {
    const crochets = this.crochetRepository.findAll();
    const crochetIndex = crochets.findIndex(crochet => crochet.id === id);

    if (crochetIndex === -1) {
      throw new Error('Crochet not found');
    }

    // Remove o crochê do array
    crochets.splice(crochetIndex, 1);

    return { message: 'Crochet deleted successfully' };
  }
}
