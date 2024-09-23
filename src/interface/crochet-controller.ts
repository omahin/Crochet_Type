import { Request, Response } from 'express';
import { CreateCrochetUseCase } from '../application/use-cases/create-crochet-use-case';
import { ListAllCrochetsUseCase } from '../application/use-cases/list-all-crochets-use-case';
import { UpdateCrochetUseCase } from '../application/use-cases/update-crochet-use-case';
import { DeleteCrochetUseCase } from '../application/use-cases/delete-crochet-use-case';

export interface CreateCrochetDTO {
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

interface CrochetDTO {
  id: string;
  createdAt: string;
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

export class CrochetController {
  constructor(
    private createCrochetUseCase: CreateCrochetUseCase,
    private listAllCrochetsUseCase: ListAllCrochetsUseCase,
    private updateCrochetUseCase: UpdateCrochetUseCase,  // Adicionando caso de uso de atualização
    private deleteCrochetUseCase: DeleteCrochetUseCase   // Adicionando caso de uso de exclusão
  ) {}

  // Método para criar
  create(req: Request, res: Response): Response {
    const crochetDTO: CreateCrochetDTO = req.body;
    const crochet = this.createCrochetUseCase.execute(crochetDTO);
    return res.status(201).json(crochet);
  }

  // Método para listar todos
  listAll(req: Request, res: Response): Response {
    const crochets = this.listAllCrochetsUseCase.execute();
    return res.status(200).json(crochets);
  }

  // Método para atualizar
  update(req: Request, res: Response): Response {
    const { id } = req.params;
    const crochetDTO: Partial<CreateCrochetDTO> = req.body;
    try {
      const updatedCrochet = this.updateCrochetUseCase.execute(id, crochetDTO);
      return res.status(200).json(updatedCrochet);
    } catch (error) {
      return res.status(404).json({ message: 'Crochet not found' });
    }
  }

  // Método para deletar
  delete(req: Request, res: Response): Response {
    const { id } = req.params;
    try {
      this.deleteCrochetUseCase.execute(id);
      return res.status(204).json({ message: 'Crochet thread deleted with susccefull'}).send();
    } catch (error) {
      return res.status(404).json({ message: 'Crochet not found' });
    }
  }
}
