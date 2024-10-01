import { Request, Response } from 'express';
import { CreateCrochetUseCase } from '../application/use-cases/create-crochet-use-case';
import { ListAllCrochetsUseCase } from '../application/use-cases/list-all-crochets-use-case';
import { UpdateCrochetUseCase } from '../application/use-cases/update-crochet-use-case';
import { DeleteCrochetUseCase } from '../application/use-cases/delete-crochet-use-case';
import { Crochet } from '../domain/crochet';

export class CrochetController {
  constructor(
    private createCrochetUseCase: CreateCrochetUseCase,
    private listAllCrochetsUseCase: ListAllCrochetsUseCase,
    private updateCrochetUseCase: UpdateCrochetUseCase,
    private deleteCrochetUseCase: DeleteCrochetUseCase
  ) {}

    // Método para criar
  create(req: Request, res: Response) {
    const params: Crochet = req.body;
    const crochet = this.createCrochetUseCase.execute(params);
    res.status(201).json(crochet);
  }

  // Método para listar todos
  async listAll(req: Request, res: Response) {
    const crochets = await this.listAllCrochetsUseCase.execute();
    return res.status(200).json(crochets);
  }

  // Método para atualizar
 async update(req: Request, res: Response) {
    const params = req.body;
    const { id } = req.params;

    const crochetUpdate = await this.updateCrochetUseCase.execute(id, params);  
    res.json({message: `Crochet $(id) updated with success`, crochetUpdate});
  }

  // Método para deletar
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const crochetFiltered = await this.deleteCrochetUseCase.execute(id);
    res.json({message: `Crochet $(id) deleted with success`, crochetFiltered});
  }
}
