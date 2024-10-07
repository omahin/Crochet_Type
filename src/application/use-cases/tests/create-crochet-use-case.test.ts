import { CreateCrochetUseCase } from '../create-crochet-use-case';
import { CrochetRepository } from '../../repositories/crochet-repository';
import { Crochet } from '../../../domain/crochet';

describe('CreateCrochetUseCase', () => {
  let createCrochetUseCase: CreateCrochetUseCase;
  let crochetRepository: CrochetRepository;

  beforeEach(() => {
    // Criando um mock do repositório
    crochetRepository = {
      save: jest.fn(),
    } as unknown as CrochetRepository;

    // Instanciando o caso de uso
    createCrochetUseCase = new CreateCrochetUseCase(crochetRepository);
  });

  it('deve criar um crochet com a data atual e os parâmetros fornecidos', () => {
    // Mock da função de data
    const mockDate = '01/10/2024';
    jest.spyOn(createCrochetUseCase as any, 'getDate').mockReturnValue(mockDate);

    // Parâmetros fornecidos
    const crochetParams: Partial<Crochet> = {
      nome_fio: 'Fio de algodão',
      tex: 200
    };

    // Executar o caso de uso
    const crochet = createCrochetUseCase.execute(crochetParams);

    // Verificar se o objeto crochet foi criado corretamente
    expect(crochet).toEqual({
      created_at: mockDate,
      ...crochetParams,
    });

    // Verificar se o repositório save foi chamado com o objeto correto
    expect(crochetRepository.save).toHaveBeenCalledWith(crochet);
  });

  it('deve salvar o crochet no repositório', () => {
    // Mock da função de data
    const mockDate = '02/10/2024';
    jest.spyOn(createCrochetUseCase as any, 'getDate').mockReturnValue(mockDate);

    const crochetParams: Partial<Crochet> = {
      nome_fio: 'Fio de seda',
      tex: 200,
    };

    createCrochetUseCase.execute(crochetParams);

    // Verificar se save foi chamado
    expect(crochetRepository.save).toHaveBeenCalled();
  });

  it('deve chamar o método getDate para obter a data de criação', () => {
    const spyGetDate = jest.spyOn(createCrochetUseCase as any, 'getDate');

    const crochetParams: Partial<Crochet> = {
      nome_fio: 'Fio de lã',
      tex: 120,
    };

    createCrochetUseCase.execute(crochetParams);

    // Verifica se o getDate foi chamado
    expect(spyGetDate).toHaveBeenCalled();
  });
});
