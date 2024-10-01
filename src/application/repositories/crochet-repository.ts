import { Crochet } from "../../domain/crochet";
export interface CrochetRepository {
  save(crochet: Crochet): Promise<void>;
  findAll(): Promise<Array<Crochet>>;
  update(id: string, params: Partial<Crochet>): Promise<Crochet | null>;
  delete(id: string): Promise<void>;
}
