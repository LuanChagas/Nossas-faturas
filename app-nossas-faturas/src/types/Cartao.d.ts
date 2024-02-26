interface Cartao {
  id?: number;
  nome: string;
  pix: string | null;
  dia_fechamento: string;
  dia_vencimento: string;
  limite_total: number;
  limite_disponivel: number;
}

interface CartaoPaginated {
  items: Cartao[];
  meta: MetaPaginated;
  links: LinksPaginated;
}

interface IFormInputsCartao {
  id?: number;
  nome: string;
  pix: string;
  fechamento: string;
  vencimento: string;
  limiteTotal: string;
  limiteDisponivel: string;
}
