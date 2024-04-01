interface Transacao {
  loja: string;
  pessoa: string;
  cartao_id: number;
  parcela: number;
  valor: number;
  cartao: string;
  data_fatura: string;
}

interface TransacaoAgrupada {
  cartao: {
    id: number;
    nome: string;
  };
  fatura: Date;
  total: number;
  transacoes: Transacao[];
}
