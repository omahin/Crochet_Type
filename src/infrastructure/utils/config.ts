import { Repository } from '../database/mongo-db/repository';
import { CreateCrochetUseCase } from '../../application/use-cases/create-crochet-use-case';
import { CrochetController } from '../../interface/crochet-controller';
import { ListAllCrochetsUseCase } from '../../application/use-cases/list-all-crochets-use-case';
import { DeleteCrochetUseCase } from '../../application/use-cases/delete-crochet-use-case';
import { UpdateCrochetUseCase } from '../../application/use-cases/update-crochet-use-case';

export function configureDependencies() {
  const crochetRepository = new Repository();
  const createCrochetUseCase = new CreateCrochetUseCase(crochetRepository);
  const listAllCrochetsUseCase = new ListAllCrochetsUseCase(crochetRepository);
  const updateCrochetUseCase = new UpdateCrochetUseCase(crochetRepository);
  const deleteCrochetUseCase = new DeleteCrochetUseCase(crochetRepository);
  const crochetController = new CrochetController(createCrochetUseCase, listAllCrochetsUseCase, updateCrochetUseCase, deleteCrochetUseCase);

  return {
    crochetController
  };
}
