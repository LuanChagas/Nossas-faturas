interface FiltroTransacoesResponse {
  pessoas: Pessoa[];
  cartoes: Cartao[];
  faturas: string[];
}

interface FiltroTransacoes extends Omit<FiltroTransacoesResponse, "faturas"> {
  fatura: string;
}

interface FiltroTransacoesRequest {
  cartoes: number[];
  pessoas: number[];
  fatura: string;
}

interface Transacao {
  cartao: {
    id: number;
    nome: string;
  };
  fatura: Date;
  total: number;
  transacoes: TransacaoDados[];
}

interface TransacaoDados {
  loja: string;
  pessoa: string;
  cartao_id: number;
  parcela: number;
  valor: number;
  cartao: string;
  data_fatura: string;
}
