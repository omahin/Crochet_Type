import { UpdateCrochetUseCase } from '../update-crochet-use-case';
import { CrochetRepository } from '../../repositories/crochet-repository';
import { Crochet } from '../../../domain/crochet';

describe('UpdateCrochetUseCase', () => {
  let updateCrochetUseCase: UpdateCrochetUseCase;
  let crochetRepository: CrochetRepository;

  beforeEach(() => {
    // Criar um mock do repositório
    crochetRepository = {
      update: jest.fn(), // Mockando o método update
    } as unknown as CrochetRepository;

    // Instanciar o caso de uso
    updateCrochetUseCase = new UpdateCrochetUseCase(crochetRepository);
  });

  it('deve chamar o repositório com o id e os parâmetros de atualização corretos', async () => {
    const crochetId = '1';
    const updateParams = { nome_fio: 'Fio de algodão premium', comprimento: '180' };

    // Mockando a resposta do repositório
    const updatedCrochet: Crochet = {
        id: crochetId,
        created_at: '01/10/2024',
        nome_fio: 'Fio de algodão premium',
        descricao: 'Fio de alta qualidade para crochê',
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
    };
    (crochetRepository.update as jest.Mock).mockResolvedValueOnce(updatedCrochet);

    // Executar o caso de uso
    const result = await updateCrochetUseCase.execute(crochetId, updateParams);

    // Verificar se o repositório foi chamado com o id e os parâmetros corretos
    expect(crochetRepository.update).toHaveBeenCalledWith(crochetId, updateParams);
    expect(result).toEqual(updatedCrochet);
  });

  it('deve retornar null se o crochê não for encontrado', async () => {
    const crochetId = '2';
    const updateParams = { nome_fio: 'Fio de lã', comprimento: '150' };

    // Mockando a resposta do repositório como null
    (crochetRepository.update as jest.Mock).mockResolvedValueOnce(null);

    // Executar o caso de uso
    const result = await updateCrochetUseCase.execute(crochetId, updateParams);

    // Verificar se o resultado é null
    expect(result).toBeNull();
  });

  it('deve lidar com erros do repositório', async () => {
    const crochetId = '3';
    const updateParams = { nome_fio: 'Fio de seda', comprimento: '200', tex: 100, quantidade_cores: 5, status: 'available' as 'available', descricao: 'Fio de seda para crochê', composicao: '100% seda', peso: '100g', agulha_croche_minimo: '2mm', agulha_croche_maximo: '4mm', agulha_trico_minimo: '3mm', agulha_trico_maximo: '5mm', malha_rendimento_dimensao: '10x10cm = 20pts x 25carr', malha_rendimento_agulha_trico: '10x10cm = 20pts x 25carr' };

    // Simulando um erro no repositório
    (crochetRepository.update as jest.Mock).mockRejectedValueOnce(new Error('Update failed'));

    // Verificar se o caso de uso propaga o erro
    await expect(updateCrochetUseCase.execute(crochetId, updateParams)).rejects.toThrow('Update failed');
  });
});
