import { CrochetRepository } from "../repositories/crochet-repository";
import { Crochet } from "../../domain/crochet";

export class ListAllCrochetsUseCase {
  constructor(private crochetRepository: CrochetRepository) {}

 async execute(): Promise<Array<Crochet>> {
    return await this.crochetRepository.findAll();
  }
}