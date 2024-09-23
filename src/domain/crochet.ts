export interface Crochet {
  id: string;
  created_at: string;
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
  status: 'available' | 'unavailable';
}
