import { ListAllCrochetsUseCase } from '../list-all-crochets-use-case';
import { CrochetRepository } from '../../repositories/crochet-repository';
import { Crochet } from '../../../domain/crochet';

describe('ListAllCrochetsUseCase', () => {
  let listAllCrochetsUseCase: ListAllCrochetsUseCase;
  let crochetRepository: CrochetRepository;

  beforeEach(() => {
    // Mock do repositório
    crochetRepository = {
      findAll: jest.fn(), // Mockando o método findAll
    } as unknown as CrochetRepository;

    // Instanciar o caso de uso
    listAllCrochetsUseCase = new ListAllCrochetsUseCase(crochetRepository);
  });

  it('deve chamar o repositório para listar todos os crochês', async () => {
    // Executar o caso de uso
    await listAllCrochetsUseCase.execute();

    // Verificar se o repositório foi chamado corretamente
    expect(crochetRepository.findAll).toHaveBeenCalled();
  });

  it('deve retornar uma lista de crochês', async () => {
    const mockCrochets: Array<Crochet> = [
      {
          id: '1',
          created_at: '01/10/2024',
          nome_fio: 'Fio de algodão',
          descricao: 'Um fio para crochê de algodão',
          tex: 0,
          composicao: '',
          comprimento: '',
          peso: '',
          agulha_croche_minimo: '',
          agulha_croche_maximo: '',
          agulha_trico_minimo: '',
          agulha_trico_maximo: '',
          quantidade_cores: 0,
          malha_rendimento_dimensao: '',
          malha_rendimento_agulha_trico: '',
          status: 'available'
      },
      {
          id: '2',
          created_at: '02/10/2024',
          nome_fio: 'Fio de lã',
          descricao: 'Fio para crochê de lã',
          tex: 0,
          composicao: '',
          comprimento: '',
          peso: '',
          agulha_croche_minimo: '',
          agulha_croche_maximo: '',
          agulha_trico_minimo: '',
          agulha_trico_maximo: '',
          quantidade_cores: 0,
          malha_rendimento_dimensao: '',
          malha_rendimento_agulha_trico: '',
          status: 'available'
      },
    ];

    // Mockando a resposta do repositório
    (crochetRepository.findAll as jest.Mock).mockResolvedValueOnce(mockCrochets);

    // Executar o caso de uso
    const result = await listAllCrochetsUseCase.execute();

    // Verificar se o resultado é o esperado
    expect(result).toEqual(mockCrochets);
  });

  it('deve retornar uma lista vazia se não houver crochês', async () => {
    // Mockando a resposta como uma lista vazia
    (crochetRepository.findAll as jest.Mock).mockResolvedValueOnce([]);

    // Executar o caso de uso
    const result = await listAllCrochetsUseCase.execute();

    // Verificar se o resultado é uma lista vazia
    expect(result).toEqual([]);
  });

  it('deve lançar um erro se o repositório falhar', async () => {
    // Simulando um erro no repositório
    (crochetRepository.findAll as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    // Verificar se o caso de uso propaga o erro
    await expect(listAllCrochetsUseCase.execute()).rejects.toThrow('Database error');
  });
});
