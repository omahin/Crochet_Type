import { Crochet } from '../../domain/crochet';
import { CrochetRepository } from '../repositories/crochet-repository';
import { IdGenerator } from '../repositories/id-generator-interface';

interface CrochetParams {
  fio: string;
  tex: number;
  composicao: string;
  comprimento: string;
  peso: string;
  agulha_croche_minimo: string;
  agulha_croche_maximo: string;
  agulha_trico_minimo: string;
  agulha_trico_maximo: string;
  quantidade_cores: number;
  malha_rendimento_dimensao: string;
  malha_rendimento_agulha_trico: string;
}

export class CreateCrochetUseCase {
  constructor(
    private crochetRepository: CrochetRepository,
    private idGenerator: IdGenerator
  ) {}

  execute(crochetParams: CrochetParams): Crochet {
    const crochet: Crochet = {
        id: this.getId(),
        created_at: this.getDate(),
        ...crochetParams,
        status: 'available'
    };

    this.crochetRepository.save(crochet);
    return crochet;
  }

  private getDate() {
    return new Date().toLocaleDateString('PT-br');
  }

  private getId() {
    return this.idGenerator.generate();
  }
}