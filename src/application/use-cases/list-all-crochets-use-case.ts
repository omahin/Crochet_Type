import { CrochetRepository } from "../repositories/crochet-repository";

export class ListAllCrochetsUseCase {
  constructor(private crochetRepository: CrochetRepository) {}

  execute() {
    const crochets = this.crochetRepository.findAll();
    return crochets;
  }
}