import { DeleteCrochetUseCase } from '../../src/application/use-cases/delete-crochet-use-case';
import { CrochetRepository } from '../../src/application/repositories/crochet-repository';

describe('DeleteCrochetUseCase', () => {
  let deleteCrochetUseCase: DeleteCrochetUseCase;
  let crochetRepository: CrochetRepository;

  beforeEach(() => {
    // Mock do repositório
    crochetRepository = {
      delete: jest.fn(), // Mockando o método delete
    } as unknown as CrochetRepository;

    // Instanciar o caso de uso com o repositório mockado
    deleteCrochetUseCase = new DeleteCrochetUseCase(crochetRepository);
  });

  it('deve chamar o repositório com o id correto para deletar', async () => {
    const crochetId = '12345';

    // Executar o caso de uso
    await deleteCrochetUseCase.execute(crochetId);

    // Verificar se o repositório foi chamado com o id correto
    expect(crochetRepository.delete).toHaveBeenCalledWith(crochetId);
  });

  it('não deve lançar erro ao tentar deletar', async () => {
    const crochetId = '67890';

    // Simulando que o método delete resolve sem erros
    (crochetRepository.delete as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(deleteCrochetUseCase.execute(crochetId)).resolves.toBeUndefined();
  });

  it('deve lidar com erros do repositório', async () => {
    const crochetId = '99999';

    // Simulando que o repositório lança um erro ao tentar deletar
    (crochetRepository.delete as jest.Mock).mockRejectedValueOnce(new Error('Delete failed'));

    await expect(deleteCrochetUseCase.execute(crochetId)).rejects.toThrow('Delete failed');
  });
});
