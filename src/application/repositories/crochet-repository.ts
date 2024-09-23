import { Crochet } from "../../domain/crochet";

export interface CrochetRepository {
  save(crochet: Crochet): void;
    findAll(): Crochet[];
}
