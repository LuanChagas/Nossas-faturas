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

interface IFormInputsLoja {
  id?: number;
  nome: string;
}
